from datetime import timedelta
from django.utils import timezone

import requests
from django.shortcuts import render, redirect
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from django.http import HttpResponse
import os

from django.utils.text import normalize_newlines
from django.contrib.auth.models import User
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from .serializer import *
from rest_framework import viewsets
from .models import Artist
from .serializer import ArtistSerializer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializer import UserSerializer

from .models import SpotifyUser
import urllib.parse


# Create your views here.
from django.http import HttpResponse

SPOTIFY_CLIENT_ID = settings.SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET = settings.SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI = settings.SPOTIFY_REDIRECT_URI
SPOTIFY_REFRESH_TOKEN = settings.SPOTIFY_REFRESH_TOKEN
SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'
SPOTIFY_SCOPES = 'user-read-private user-read-email'


# --- User Authentication API Views ---

@api_view(['POST'])
def register(request):
    """API endpoint for user registration with auto-login."""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Auto-login the user
        auth_login(request, user)
        token, created = Token.objects.get_or_create(user=user)

        print(f"DEBUG: User registered and logged in: {user.username}")

        return Response({
            "success": True,
            "token": token.key,
            "username": user.username,
            "redirect": "profile",
            "message": "Registration successful",
            "hasSpotifyLinked": False
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""checks spotify linked status after logging in"""


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_spotify_link(request):
    """Check if user has linked their Spotify account."""
    try:
        print("=== DEBUG CHECK_SPOTIFY_LINK ===")
        print(f"DEBUG: Checking Spotify link for user: {request.user.username}")
        print(f"User ID: {request.user.id}")
        print(f"User authenticated: {request.user.is_authenticated}")

        # Query all SpotifyUsers to debug
        all_spotify_users = SpotifyUser.objects.all()
        print("All SpotifyUsers in database:")
        for su in all_spotify_users:
            print(f"- Django User: {su.user.username}, Spotify Display Name: {su.display_name}")

        spotify_user = SpotifyUser.objects.get(user=request.user)
        print(f"Found SpotifyUser: {spotify_user.display_name}")
        print("=== END DEBUG ===")

        # Add token refresh check here
        if spotify_user.token_expiry and spotify_user.token_expiry <= timezone.now():
            print("DEBUG: Token expired, refreshing...")
            try:
                new_token = refresh_spotify_token(spotify_user.refresh_token)
                spotify_user.access_token = new_token
                spotify_user.token_expiry = timezone.now() + timedelta(hours=1)
                spotify_user.save()
                print("DEBUG: Token refreshed successfully")
            except Exception as e:
                print(f"DEBUG: Token refresh failed: {str(e)}")
                return Response({
                    "hasSpotifyLinked": False,
                    "error": "Token refresh failed"
                })

        return Response({
            "hasSpotifyLinked": True,
            "spotifyData": {
                "display_name": spotify_user.display_name,
                "spotify_id": spotify_user.spotify_id
            }
        })
    except SpotifyUser.DoesNotExist:
        print(f"DEBUG: No Spotify user found for: {request.user.username}")
        print("All SpotifyUsers in database:")
        for su in SpotifyUser.objects.all():
            print(f"- Django User: {su.user.username}, Spotify Display Name: {su.display_name}")
        return Response({
            "hasSpotifyLinked": False,
            "message": "No Spotify account linked"
        })
    except Exception as e:
        print(f"DEBUG: Error in check_spotify_link: {str(e)}")
        return Response({
            "error": str(e),
            "hasSpotifyLinked": False
        }, status=500)


def spotify_callback(request):
    code = request.GET.get('code')
    state = request.GET.get('state')

    if not code:
        return redirect('http://localhost:3000/profile?error=spotify_auth_failed')

    try:
        user = User.objects.get(id=state)

        # Exchange code for tokens
        token_response = requests.post(
            'https://accounts.spotify.com/api/token',
            data={
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': SPOTIFY_REDIRECT_URI,
                'client_id': SPOTIFY_CLIENT_ID,
                'client_secret': SPOTIFY_CLIENT_SECRET,
            }
        )

        if token_response.status_code != 200:
            return redirect('http://localhost:3000/profile?error=token_exchange_failed')

        token_data = token_response.json()

        # Get Spotify user data with detailed debugging
        headers = {'Authorization': f"Bearer {token_data['access_token']}"}
        user_response = requests.get('https://api.spotify.com/v1/me', headers=headers)

        if user_response.status_code != 200:
            return redirect('http://localhost:3000/profile?error=spotify_profile_failed')

        spotify_data = user_response.json()

        # Debug print the entire response
        print("\n=== SPOTIFY API RESPONSE DATA ===")
        print("Full response:", spotify_data)
        print("\nKey fields:")
        print(f"id: {spotify_data.get('id')}")
        print(f"uri: {spotify_data.get('uri')}")
        print(f"display_name: {spotify_data.get('display_name')}")
        print(f"external_urls: {spotify_data.get('external_urls')}")

        # Extract username from Spotify URI
        spotify_uri = spotify_data.get('uri', '')
        spotify_username = spotify_uri.split(':')[-1] if spotify_uri else None

        # Create or update SpotifyUser with explicit field mapping
        spotify_user, created = SpotifyUser.objects.update_or_create(
            user=user,
            defaults={
                'spotify_id': spotify_data.get('id'),  # This should be the actual Spotify ID
                'spotify_username': spotify_username,  # This should be the username
                'display_name': spotify_data.get('display_name'),
                'external_url': spotify_data.get('external_urls', {}).get('spotify'),
                'profile_image_url': (
                    spotify_data.get('images', [{}])[0].get('url')
                    if spotify_data.get('images')
                    else None
                ),
                'access_token': token_data['access_token'],
                'refresh_token': token_data.get('refresh_token'),
                'token_expiry': timezone.now() + timedelta(seconds=3600)
            }
        )

        # Debug print the saved data
        print("\n=== SAVED SPOTIFY USER DATA ===")
        print(f"Spotify ID saved: {spotify_user.spotify_id}")
        print(f"Spotify Username saved: {spotify_user.spotify_username}")
        print(f"Display Name saved: {spotify_user.display_name}")
        print("================================\n")

        # Fetch additional Spotify data
        fetch_all_spotify_data(spotify_user)

        return redirect('http://localhost:3000/profile?linked=success')

    except User.DoesNotExist:
        return redirect('http://localhost:3000/profile?error=user_not_found')
    except Exception as e:
        print(f"Error in spotify_callback: {str(e)}")
        return redirect(f'http://localhost:3000/profile?error={str(e)}')

@api_view(['GET'])
def get_spotify_credentials(request):
    """API endpoint to provide Spotify credentials for React."""
    print("DEBUG: Spotify Client ID:", settings.SPOTIFY_CLIENT_ID)  # Add this temporarily
    data = {
        'client_id': settings.SPOTIFY_CLIENT_ID,
        'redirect_uri': SPOTIFY_REDIRECT_URI,
    }
    return JsonResponse(data)

class ReactAppView(View):
    def get(self, request, *args, **kwargs):
        try:
            # Serve the React index.html
            with open(os.path.join(settings.REACT_APP_DIR, 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponse(
                "React build not found. Run 'npm run build' in the frontend folder.",
                status=501,
            )

# User login
@api_view(['POST'])
def user_login(request):
    """API endpoint for user login."""
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    if user is not None:
        auth_login(request, user)
        # Create or get the auth token
        token, _ = Token.objects.get_or_create(user=user)

        # Explicitly set session data
        request.session['user_id'] = user.id
        request.session['username'] = user.username
        request.session.save()  # Force save the session

        # Return both token and user data
        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            },
            "isLoggedIn": True
        }, status=status.HTTP_200_OK)
    return Response({
        "error": "Invalid credentials",
        "isLoggedIn": False
    }, status=status.HTTP_400_BAD_REQUEST)


# --- Spotify Integration View ---
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlink_spotify(request):
    # Access the SpotifyUser profile via the related name 'spotify_profile'
    spotify_profile = getattr(request.user, 'spotify_profile', None)
    if spotify_profile:
        spotify_profile.access_token = None
        spotify_profile.refresh_token = None
        spotify_profile.save()
        return Response({"message": "Spotify account unlinked successfully"}, status=status.HTTP_200_OK)
    return Response({"error": "Spotify profile not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def spotify_login(request):
    """Initiates Spotify account linking process."""
    try:
        print(f"DEBUG: User ID being set as state: {request.user.id}")
        scopes = 'user-library-read user-top-read user-read-private user-read-email'
        auth_params = {
            'client_id': settings.SPOTIFY_CLIENT_ID,
            'response_type': 'code',
            'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
            'scope': scopes,
            'state': str(request.user.id),
            'show_dialog': 'true'
        }

        auth_url = f"https://accounts.spotify.com/authorize?{urllib.parse.urlencode(auth_params)}"
        print(f"DEBUG: Generated Spotify auth URL: {auth_url}")  # Debug print

        return Response({
            "auth_url": auth_url,
            "status": "success"
        })
    except Exception as e:
        return Response({
            "error": str(e),
            "status": "error"
        }, status=400)


@api_view(['GET'])
def check_login(request):
    """Check if user is logged in and return relevant data."""
    if request.user.is_authenticated:
        # Get or create token for authenticated user
        token, _ = Token.objects.get_or_create(user=request.user)
        return JsonResponse({
            "isLoggedIn": True,
            "user": {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email
            },
            "token": token.key
        }, status=200)
    return JsonResponse({"isLoggedIn": False}, status=200)


# --- Artist and React Data Views ---

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_wrapped(request):
    try:
        print("DEBUG: Request data:", request.data)
        print("DEBUG: View Permissions:", request.user.is_authenticated)
        print("DEBUG: Spotify Profile Exists:", hasattr(request.user, 'spotify_profile'))

        spotify_user = request.user.spotify_profile

        print("DEBUG: Frontend time_range:", request.data.get('time_range'))

        # Map frontend time_range values to Spotify's accepted values
        time_range_mapping = {
            'short': 'short_term',
            'medium': 'medium_term',
            'long': 'long_term',
            'short_term': 'short_term',
            'medium_term': 'medium_term',
            'long_term': 'long_term'
        }

        time_range = time_range_mapping.get(request.data.get('time_range'))
        print("DEBUG: Mapped time_range:", time_range)

        if not time_range:
            return Response({"error": "time_range is required"}, status=400)

        wrapped_name = request.data.get('wrapped_name', 'My Wrapped')

        headers = {'Authorization': f'Bearer {spotify_user.access_token}'}
        url = f'https://api.spotify.com/v1/me/top/tracks?time_range={time_range}&limit=1'

        response = requests.get(url, headers=headers)
        print("DEBUG: Spotify API Response Code:", response.status_code)
        print("DEBUG: Spotify API Response Body:", response.text)

        if response.status_code == 200:
            data = response.json()
            top_track = data['items'][0]
            top_track_name = top_track.get('name', 'Unknown Track')
            album_cover_url = top_track['album']['images'][0]['url'] if top_track['album']['images'] else ''

            # Debugging parsed fields
            print("DEBUG: Top Track Name:", top_track['name'])
            print("DEBUG: Album Cover URL:", top_track['album']['images'][0]['url'])

            print("DEBUG: SpotifyWrapped data about to be created:")
            print({
                "user": spotify_user,
                "time_range": time_range,
                "top_track_name": top_track["name"],
                "album_cover_url": top_track["album"]["images"][0]["url"] if top_track["album"]["images"] else None,
                "name": wrapped_name,
            })

            wrapped = SpotifyWrapped.objects.create(
                user=spotify_user,
                name=wrapped_name,
                time_range=time_range,
                top_track_name=top_track_name,
                album_cover_url=album_cover_url,
            )

            # Serialize and return the created wrapped
            serializer = SpotifyWrappedSerializer(wrapped)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

            # return Response({
            #     'id': wrapped.id,
            #     'time_range': wrapped.time_range,
            #     'top_track_name': wrapped.top_track_name,
            #     'album_cover_url': wrapped.album_cover_url,
            #     'date_created': wrapped.date_created,
            #     'wrapped_name': wrapped.name
            # }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'error': 'Failed to fetch top track from Spotify.',
                'spotify_error': response.text
            }, status=response.status_code)
    except Exception as e:
        # Debugging any errors
        print("DEBUG: Error creating wrapped:", str(e))
        return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_wrapped_data(request):
    try:
        spotify_user = request.user.spotify_profile
        wrapped_id = request.query_params.get('id')  # Fetch 'id' from query parameters

        if wrapped_id:
            # Fetch a specific wrapped by ID
            try:
                wrap = SpotifyWrapped.objects.get(user=spotify_user, id=wrapped_id)
                return Response({
                    'id': wrap.id,
                    'time_range': wrap.time_range,
                    'top_track_name': wrap.top_track_name,
                    'album_cover_url': wrap.album_cover_url,
                    'date_created': wrap.date_created
                }, status=status.HTTP_200_OK)
            except SpotifyWrapped.DoesNotExist:
                return Response({'error': 'Wrapped not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Fetch all wraps if no specific ID is provided
        wraps = SpotifyWrapped.objects.filter(user=spotify_user)
        wraps_data = [
            {
                'id': wrap.id,
                'time_range': wrap.time_range,
                'top_track_name': wrap.top_track_name,
                'album_cover_url': wrap.album_cover_url,
                'date_created': wrap.date_created,
                'wrapped_name': wrap.name
            }
            for wrap in wraps
        ]
        return Response(wraps_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': f'An error occurred: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ArtistViewSet(viewsets.ModelViewSet):
    """ViewSet for managing Artist model."""
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class ReactViewSet(viewsets.ModelViewSet):
    """ViewSet for managing React model."""
    queryset = React.objects.all()
    serializer_class = ReactSerializer

class ReactView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        details = [{"name": detail.name, "detail": detail.detail} for detail in React.objects.all()]
        return Response(details)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def fetch_all_spotify_data(spotify_user):
    """
    Fetch and store all relevant Spotify data for the specified SpotifyUser instance.
    If the access token is expired, refresh it before proceeding.
    """
    # Check token expiration and refresh if needed
    if spotify_user.token_expiry <= timezone.now():
        new_token = refresh_spotify_token(spotify_user.refresh_token)
        if new_token:
            spotify_user.access_token = new_token
            spotify_user.token_expiry = timezone.now() + timedelta(hours=1)  # Adjust expiry
            spotify_user.save()
        else:
            print("Failed to refresh Spotify token.")
            return

    headers = {'Authorization': f'Bearer {spotify_user.access_token}'}
    endpoints = {
        'top_tracks': 'https://api.spotify.com/v1/me/top/tracks',
        'top_artists': 'https://api.spotify.com/v1/me/top/artists',
        'recent_tracks': 'https://api.spotify.com/v1/me/player/recently-played',
        'saved_tracks': 'https://api.spotify.com/v1/me/tracks',
        'saved_albums': 'https://api.spotify.com/v1/me/albums',
    }

    for field, url in endpoints.items():
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            setattr(spotify_user, field, response.json().get('items', []))
        else:
            print(f"Failed to fetch {field} data: {response.status_code}")
            setattr(spotify_user, field, [])  # Set as empty list if data fetching fails

    spotify_user.save()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_all_spotify_data(request):
    """
    Fetch and store all Spotify data for the authenticated user, updating stored data.
    """
    spotify_user = request.user.spotify_profile
    fetch_all_spotify_data(spotify_user)
    return Response({"message": "All Spotify data updated successfully"}, status=200)


# --- HTML Rendered Views (Optional if API-based) ---


def login_page(request):
    return render(request, 'login.html')

def profile_page(request):
    """Displays the user's profile with their Spotify ProfileWrapped data."""
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('spotify_login')

    # Fetch the user from the database
    user = SpotifyUser.objects.get(id=user_id)

    context = {
        'user_name': user.display_name,
        'wraps': user.spotify_wraps  # Pass the user's Spotify wraps to the profile page
    }

    return render(request, 'profile.html', context)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_username(request):
    """Update the username of the authenticated user."""
    user = request.user
    new_username = request.data.get("username")

    if not new_username:
        return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

    user.username = new_username
    user.save()
    return Response({"message": "Username updated successfully"}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_email(request):
    """Update the email of the authenticated user."""
    user = request.user
    new_email = request.data.get("email")

    if not new_email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    user.email = new_email
    user.save()
    return Response({"message": "Email updated successfully"}, status=status.HTTP_200_OK)

    return render(request, 'profile.html', context)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    """Retrieve current user profile details."""
    try:
        user = request.user
        spotify_user = SpotifyUser.objects.get(user=user)

        data = {
            "username": user.username,
            "email": user.email,
            "top_artist": spotify_user.display_name if spotify_user else None,
            "profile_image_url": spotify_user.profile_image_url if spotify_user else None,
            "wraps": []  # Add your wraps data here if you have any
        }
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        print("Exception:" + str(e))
        return Response(
            {"error": "Failed to fetch profile data"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    try:
        user = request.user
        user.delete()
        return Response({"message": "Account deleted successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error deleting account: {str(e)}")  # Debug print
        return Response(
            {"error": "Failed to delete account"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

import requests
import os
import base64

def refresh_spotify_token(refresh_token):
    """Function to refresh the Spotify access token when it expires."""
    if not refresh_token:
        raise ValueError("No refresh token provided")

    print(f"DEBUG: Attempting to refresh token")

    # Spotify API Token URL
    token_url = 'https://accounts.spotify.com/api/token'

    # Retrieve client credentials
    client_id = settings.SPOTIFY_CLIENT_ID
    client_secret = settings.SPOTIFY_CLIENT_SECRET

    print(f"DEBUG: SPOTIFY_CLIENT_ID = {client_id}")
    print(f"DEBUG: SPOTIFY_CLIENT_SECRET = {client_secret}")

    if not client_id or not client_secret:
        raise ValueError("Client ID or Client Secret not provided")

    # Encode client credentials for Authorization header
    client_creds = f"{client_id}:{client_secret}"
    encoded_creds = base64.b64encode(client_creds.encode()).decode()

    try:
        # Make the POST request to refresh the token
        response = requests.post(
            token_url,
            headers={
                "Authorization": f"Basic {encoded_creds}",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data={
                "grant_type": "refresh_token",
                "refresh_token": refresh_token,
            },
        )

        print(f"DEBUG: Token refresh response status: {response.status_code}")

        if response.status_code != 200:
            print(f"DEBUG: Token refresh failed: {response.text}")
            raise ValueError(f"Failed to refresh token: {response.text}")

        # Parse response JSON
        response_data = response.json()
        return response_data.get('access_token')
    except Exception as e:
        print(f"DEBUG: Error refreshing token: {str(e)}")
        raise

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def spotify_data(request):
    """Displays user's Spotify data (e.g., user profile or top tracks) using the access token, fetching fress data if needed."""
    spotify_user = request.user.spotify_profile
    access_token = spotify_user.access_token
    refresh_token = spotify_user.refresh_token

    # Check if the access token needs to be refreshed
    if spotify_user.token_expiry <= timezone.now():
        access_token = refresh_spotify_token(refresh_token)
        if access_token:
            spotify_user.access_token = access_token
            spotify_user.token_expiry = timezone.now() + timedelta(hours=1)  # Adjust the expiry time as needed
            spotify_user.save()
        else:
            return Response({"error": "User needs to log into Spotify"}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch Spotify user profile data
    headers = {'Authorization': f'Bearer {access_token}'}
    user_profile_url = 'https://api.spotify.com/v1/me'
    user_data_response = requests.get(user_profile_url, headers=headers)

    if user_data_response.status_code != 200:
        return Response({'error': 'Failed to fetch data from Spotify'}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch and store additional Spotify data points if not present or if a refresh is needed
    fetch_all_spotify_data(spotify_user)

    # Prepare data for response
    data = {
        'user_profile': user_data_response.json(),
        'top_tracks': spotify_user.top_tracks,
        'top_artists': spotify_user.top_artists,
        'recent_tracks': spotify_user.recent_tracks,
        'saved_albums': spotify_user.saved_albums,
        'saved_tracks': spotify_user.saved_tracks,
    }
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout the user and clear the session."""
    logout(request)
    return Response({"message": "User logged out successfully"}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_wrap(request, wrap_id):
    """Deletes a specific Spotify wrap by ID."""
    user = request.user.spotifyuser
    user.spotify_wraps = [wrap for wrap in user.spotify_wraps if wrap['id'] != wrap_id]
    user.save()
    return Response({"message": "Wrap deleted successfully"}, status=status.HTTP_200_OK)

def home_view(request):
    return render(request, 'home.html')

@api_view(['GET'])
def fetch_playlist_images(request):
    """
    Fetches images from a specific Spotify playlist using the global access token.
    """
    playlist_id = '6UeSakyzhiEt4NB3UAd6NQ'

    # Use the global refresh token to get an access token
    access_token = refresh_spotify_token(SPOTIFY_REFRESH_TOKEN)
    print(access_token)

    if not access_token:
        return JsonResponse({'error': 'Failed to obtain Spotify access token'}, status=400)

    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return JsonResponse({'error': 'Failed to fetch playlist data'}, status=400)

    tracks = response.json().get('items', [])
    images = [track['track']['album']['images'][0]['url'] for track in tracks if track['track']['album']['images']]

    return JsonResponse({'images': images[:100]})  # Limit the number of images as needed


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_top_songs(request):
    """
    Fetch the user's top songs from Spotify
    Automatically refresh the token if expired.
    """
    try:
        # Debug prints
        print(f"User requesting top songs: {request.user.username}")

        user = request.user
        spotify_user = getattr(user, 'spotify_profile', None)

        print(f"Spotify user found: {spotify_user is not None}")

        if not spotify_user:
            return Response(
                {"error": "No Spotify profile found. Please link your Spotify account."},
                status=status.HTTP_404_NOT_FOUND
            )

        if not spotify_user.access_token:
            return Response(
                {"error": "No Spotify access token found. Please reconnect your Spotify account."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Check if token needs refresh
        if spotify_user.token_expiry and spotify_user.token_expiry <= timezone.now():
            try:
                print("Token is expired, refreshing...")
                new_token = refresh_spotify_token(spotify_user.refresh_token)

                if not new_token:
                    return Response(
                        {"error": "Failed to refresh Spotify token. Please reconnect your account."},
                        status=status.HTTP_401_UNAUTHORIZED
                    )

                spotify_user.access_token = new_token
                spotify_user.token_expiry = timezone.now() + timedelta(hours=1)  # Update expiry time
                spotify_user.save()
                print("Token refreshed successfully")
            except Exception as e:
                print(f"Token refresh failed: {str(e)}")
                return Response(
                    {"error": "Failed to refresh Spotify token. Please reconnect your account."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        spotify_access_token = spotify_user.access_token

        url = "https://api.spotify.com/v1/me/top/tracks"
        headers = {"Authorization": f"Bearer {spotify_access_token}"}
        params = {"limit": 12, "time_range": "medium_term"}

        print(f"Making request to Spotify API: {url}")
        response = requests.get(url, headers=headers, params=params)
        print(f"Spotify API response status: {response.status_code}")

        if response.status_code == 200:
            data = response.json()
            top_songs = [
                {
                    "song_title": item['name'],
                    "artist_name": ", ".join([artist['name'] for artist in item['artists']]),
                    "cover_image": item['album']['images'][0]['url'] if item['album']['images'] else None,
                }
                for item in data.get('items', [])
            ]
            return Response({"top_songs": top_songs}, status=200)
        else:
            print(f"Spotify API error response: {response.text}")
            return Response(
                {"error": f"Spotify API error: {response.text}"},
                status=response.status_code
            )

    except Exception as e:
        print(f"Unexpected error in get_user_top_songs: {str(e)}")
        return Response(
            {"error": "An unexpected error occurred"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_top_genres(request):
    """
    Fetch the user's top genres from Spotify by analyzing their top artists
    """
    try:
        print(f"User requesting top genres: {request.user.username}")
        user = request.user
        spotify_user = getattr(user, 'spotify_profile', None)

        if not spotify_user:
            return Response(
                {"error": "No Spotify profile found. Please link your Spotify account."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Refresh token if needed
        if spotify_user.token_expiry and spotify_user.token_expiry <= timezone.now():
            try:
                new_token = refresh_spotify_token(spotify_user.refresh_token)
                spotify_user.access_token = new_token
                spotify_user.token_expiry = timezone.now() + timedelta(hours=1)
                spotify_user.save()
            except Exception as e:
                return Response(
                    {"error": "Failed to refresh Spotify token. Please reconnect your account."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        # Get user's top artists and their genres
        url = "https://api.spotify.com/v1/me/top/artists"
        headers = {"Authorization": f"Bearer {spotify_user.access_token}"}
        params = {"limit": 50, "time_range": "medium_term"}  # Get more artists for better genre analysis

        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()

            # Create a dictionary to count genre occurrences
            genre_count = {}
            for artist in data.get('items', []):
                for genre in artist.get('genres', []):
                    genre_count[genre] = genre_count.get(genre, 0) + 1

            # Sort genres by count and get top 8
            top_genres = sorted(genre_count.items(), key=lambda x: x[1], reverse=True)[:8]

            # Format the response
            genres = [
                {
                    "rank": idx + 1,
                    "name": genre[0].title(),  # Capitalize genre names
                    "count": genre[1]
                }
                for idx, genre in enumerate(top_genres)
            ]

            return Response({"top_genres": genres}, status=200)
        else:
            print(f"Spotify API error response: {response.text}")
            return Response(
                {"error": f"Spotify API error: {response.text}"},
                status=response.status_code
            )

    except Exception as e:
        print(f"Unexpected error in get_user_top_genres: {str(e)}")
        return Response(
            {"error": "An unexpected error occurred"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_top_artists(request):
    """
    Fetch the user's top artists from Spotify
    """
    try:
        user = request.user
        spotify_user = getattr(user, 'spotify_profile', None)

        if not spotify_user:
            return Response(
                {"error": "No Spotify profile found. Please link your Spotify account."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Refresh token if needed
        if spotify_user.token_expiry and spotify_user.token_expiry <= timezone.now():
            try:
                new_token = refresh_spotify_token(spotify_user.refresh_token)
                spotify_user.access_token = new_token
                spotify_user.token_expiry = timezone.now() + timedelta(hours=1)
                spotify_user.save()
            except Exception as e:
                return Response(
                    {"error": "Failed to refresh Spotify token. Please reconnect your account."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        # Get user's top artists
        url = "https://api.spotify.com/v1/me/top/artists"
        headers = {"Authorization": f"Bearer {spotify_user.access_token}"}
        params = {"limit": 10, "time_range": "medium_term"}

        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()
            top_artists = [
                {
                    "rank": idx + 1,
                    "name": item['name'],
                    "image_url": item['images'][0]['url'] if item['images'] else None,
                }
                for idx, item in enumerate(data.get('items', []))
            ]
            return Response({"top_artists": top_artists}, status=200)
        else:
            return Response(
                {"error": f"Spotify API error: {response.text}"},
                status=response.status_code
            )

    except Exception as e:
        print(f"Unexpected error in get_user_top_artists: {str(e)}")
        return Response(
            {"error": "An unexpected error occurred"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_top_albums(request):
    """
    Fetch the user's top albums from Spotify
    """
    try:
        user = request.user
        spotify_user = getattr(user, 'spotify_profile', None)

        if not spotify_user:
            return Response(
                {"error": "No Spotify profile found. Please link your Spotify account."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Refresh token if needed
        if spotify_user.token_expiry and spotify_user.token_expiry <= timezone.now():
            try:
                new_token = refresh_spotify_token(spotify_user.refresh_token)
                spotify_user.access_token = new_token
                spotify_user.token_expiry = timezone.now() + timedelta(hours=1)
                spotify_user.save()
            except Exception as e:
                return Response(
                    {"error": "Failed to refresh Spotify token. Please reconnect your account."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        # Get user's top tracks to extract album information
        url = "https://api.spotify.com/v1/me/top/tracks"
        headers = {"Authorization": f"Bearer {spotify_user.access_token}"}
        params = {"limit": 50, "time_range": "medium_term"}  # Get more tracks to find unique albums

        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()

            # Extract unique albums from top tracks
            seen_albums = set()
            top_albums = []

            for item in data.get('items', []):
                album_id = item['album']['id']
                if album_id not in seen_albums and len(top_albums) < 10:
                    seen_albums.add(album_id)
                    top_albums.append({
                        "rank": len(top_albums) + 1,
                        "name": item['album']['name'],
                        "artist": item['album']['artists'][0]['name'],
                        "image_url": item['album']['images'][0]['url'] if item['album']['images'] else None,
                    })

            return Response({"top_albums": top_albums}, status=200)
        else:
            return Response(
                {"error": f"Spotify API error: {response.text}"},
                status=response.status_code
            )

    except Exception as e:
        print(f"Unexpected error in get_user_top_albums: {str(e)}")
        return Response(
            {"error": "An unexpected error occurred"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )