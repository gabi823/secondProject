import requests
from django.shortcuts import render, redirect
from django.conf import settings
from django.http import JsonResponse

# Create your views here.
from django.http import HttpResponse

SPOTIFY_CLIENT_ID = settings.SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET = settings.SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI = settings.SPOTIFY_REDIRECT_URI

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

        # Save tokens in the session
        request.session['spotify_access_token'] = access_token
        request.session['spotify_refresh_token'] = refresh_token

        return redirect('spotify_data')

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
    return redirect('spotify_login')