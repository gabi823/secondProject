from datetime import timedelta
from django.utils import timezone

import requests
from django.shortcuts import render, redirect
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required

from django.utils.text import normalize_newlines
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


# Create your views here.
from django.http import HttpResponse

SPOTIFY_CLIENT_ID = settings.SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET = settings.SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI = settings.SPOTIFY_REDIRECT_URI


# --- User Authentication API Views ---
@api_view(['POST'])
def register(request):
    """API endpoint for user registration."""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User login
@api_view(['POST'])
def user_login(request):
    """API endpoint for user login."""
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)

    if user is not None:
        auth_login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


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

@login_required
def spotify_login(request):
    """
    Redirects the user to Spotify's authorization URL for login.
    """
    scopes = 'user-library-read user-top-read'
    url = (
        'https://accounts.spotify.com/authorize'
        f'?client_id={SPOTIFY_CLIENT_ID}'
        f'&response_type=code'
        f'&redirect_uri={SPOTIFY_REDIRECT_URI}'
        f'&scope={scopes}'
    )
    return redirect(url)

def spotify_callback(request):
    """
    Handles the callback from Spotify after the user logs in.
    """
    # Process the request and get the authorization code
    code = request.GET.get('code')
    token_url = 'https://accounts.spotify.com/api/token'

    if code:
        # Exchange authorization code for access token
        response = requests.post(
            token_url,
            data={
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': SPOTIFY_REDIRECT_URI,
                'client_id': SPOTIFY_CLIENT_ID,
                'client_secret': SPOTIFY_CLIENT_SECRET,
            },
        )

        response_data = response.json()
        access_token = response_data.get('access_token')
        refresh_token = response_data.get('refresh_token')
        expires_in = response_data.get('expires_in', 3600)
        token_expiry = timezone.now() + timedelta(seconds=expires_in)

        # Use the access token to fetch user profile information
        headers = {'Authorization': f'Bearer {access_token}'}
        user_profile_url = 'https://api.spotify.com/v1/me'
        user_data_response = requests.get(user_profile_url, headers=headers)
        user_data = user_data_response.json()

        # Extract user data
        spotify_id = user_data.get('id')
        display_name = user_data.get('display_name')
        external_url = user_data.get('external_urls').get('spotify')

        # Check if the user already exists in the database
        user, created = SpotifyUser.objects.get_or_create(spotify_id=spotify_id)
        user.display_name = display_name
        user.external_url = external_url
        user.access_token = access_token
        user.refresh_token = refresh_token
        user.token_expiry = token_expiry
        user.save()

        return JsonResponse({"message": "Spotify account linked successfully", "display_name": display_name}, status = 200)
    return JsonResponse({"error": "Spotify authentication failed"}, status = 400)


# --- Artist and React Data Views ---


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
    """Retrieve current user profile details (username and email)."""
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    user = request.user
    user.delete()
    return Response({"message": "Account deleted successfully"}, status=status.HTTP_200_OK)

def refresh_spotify_token(refresh_token):
    """Function to refresh the Spotify access token when it expires."""
    token_url = 'https://accounts.spotify.com/api/token'
    response = requests.post(
        token_url,
        data={
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': SPOTIFY_CLIENT_ID,
            'client_secret': SPOTIFY_CLIENT_SECRET,
        }
    )
    response_data = response.json()
    return response_data.get('access_token')

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
    request.auth.delete()
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
