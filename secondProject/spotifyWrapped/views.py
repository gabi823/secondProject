from datetime import timedelta
from django.utils import timezone

import requests
from django.shortcuts import render, redirect
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth import logout as django_logout, login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.utils.text import normalize_newlines

from .models import SpotifyUser
from .forms import UserRegisterForm

# Create your views here.
from django.http import HttpResponse

SPOTIFY_CLIENT_ID = settings.SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET = settings.SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI = settings.SPOTIFY_REDIRECT_URI

# User registration
def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save();
            login(request, user)
            return redirect('spotify_login')  # Redirect to Spotify linking after registration
        else:
            form = UserRegisterForm()
        return render(request, 'register.html', {"form": form})

# User login
def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('profile_page')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {"form": form})

# Unlink Spotify account
@login_required
def unlink_spotify(request):
    user = SpotifyUser.objects.get(id=request.user.id)
    user.access_token = None
    user.refresh_token = None
    user.save()
    return redirect('spotify_login')

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

def login_page(request):
    return render(request, 'login.html')


def profile_page(request):
    """
    Displays the user's profile with their Spotify Wrapped data.
    """
    user_id = request.session.get('user_id')

    if not user_id:
        return redirect('spotify_login')

    # Fetch the user from the database
    user = SpotifyUser.objects.get(id=user_id)

    # Fetch the user's saved Spotify Wrapped data (if any)
    wraps = user.spotify_wraps

    context = {
        'user_name': user.display_name,
        'wraps': wraps  # Pass the user's Spotify wraps to the profile page
    }

    return render(request, 'profile.html', context)

def delete_account(request):
    # Handle account deletion logic
    if request.method == "POST":
        user_id = request.session.get('user_id')
        # Logic to delete the user from the database
        SpotifyUser.objects.filter(id=user_id).delete()
        request.session.flush()
        return redirect('login_page')
    return render(request, 'delete_account.html')

def spotify_callback(request):
    """
    Handles the callback from Spotify after the user logs in.
    """
    # Process the request and get the authorization code
    code = request.GET.get('code')

    if code:
        # Exchange authorization code for access token
        token_url = 'https://accounts.spotify.com/api/token'
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

        # Calculate token expiry time
        token_expiry = timezone.now() + timedelta(seconds=expires_in)

        # Use the access token to fetch user profile information
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
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

        # Save the user_name and tokens in the session for the profile page
        request.session['spotify_user_name'] = display_name
        request.session['spotify_access_token'] = access_token
        request.session['spotify_refresh_token'] = refresh_token
        request.session['user_id'] = user.id

        return redirect('profile_page')

    return redirect('spotify_login')

def refresh_spotify_token(refresh_token):
    """
    Function to refresh the Spotify access token when it expires.
    """
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

def spotify_data(request):
    """
    Displays user's Spotify data (e.g., user profile or top tracks) using the access token.
    """
    access_token = request.session.get('spotify_access_token')
    refresh_token = request.session.get('spotify_refresh_token')

    if not access_token:
        if refresh_token:
            access_token = refresh_spotify_token(refresh_token)
            request.session['spotify_access_token'] = access_token
        else:
            return redirect('spotify_login')

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    # Fetch user profile data

    user_profile_url = 'https://api.spotify.com/v1/me'
    user_data_response = requests.get(user_profile_url, headers=headers)

    if user_data_response.status_code != 200:
        return JsonResponse({'error': 'Failed to fetch data from Spotify'}, status=400)

    user_data = user_data_response.json()

    return JsonResponse(user_data)

def logout_view(request):
    """
    Logout the user and clear the session.
    """
    request.session.flush()
    return redirect('login_page')


def delete_wrap(request, wrap_id):
    """
    Deletes a specific Spotify wrap by ID.
    """
    user_id = request.session.get('user_id')

    if not user_id:
        return redirect('spotify_login')

    # Fetch the user from the database
    user = SpotifyUser.objects.get(id=user_id)

    # Delete the wrap by filtering it out
    user.spotify_wraps = [wrap for wrap in user.spotify_wraps if wrap['id'] != wrap_id]
    user.save()

    return redirect('profile_page')