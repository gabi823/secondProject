import requests
from django.shortcuts import render
from django.shortcuts import redirect
from django.conf import settings
from django.http import JsonResponse

# Create your views here.
from django.http import HttpResponse

SPOTIFY_CLIENT_ID = settings.SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET = settings.SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI = settings.SPOTIFY_REDIRECT_URI

def spotify_login(request):
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
    # Process the request and get the authorization code
    code = request.GET.get('code')
    # Exchange code for an access token with Spotify API, etc.
    code = request.GET.get('code')

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

    # Save tokens in the session or database
    request.session['spotify_access_token'] = access_token
    request.session['spotify_refresh_token'] = refresh_token

    return redirect('spotify_data')

def spotify_data(request):
    access_token = request.session.get('spotify_access_token')

    if not access_token:
        return redirect('spotify_login')

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    user_profile_url = 'https://api.spotify.com/v1/me'
    user_data_response = requests.get(user_profile_url, headers=headers)
    user_data = user_data_response.json()

    return JsonResponse(user_data)