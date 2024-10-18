from django.shortcuts import render, redirect
from spotipy.oauth2 import SpotifyOAuth
from django.conf import settings
import spotipy

# Create your views here.
from django.http import HttpResponse

def login_page(request):
    """
    Render the login page with a button to log in via Spotify.
    """
    return render(request, 'spotifyWrapped/login.html')

def spotify_login(request):
    """
    Redirects the user to Spotify's authorization URL for logging in.
    """
    sp_oauth = SpotifyOAuth(
        client_id=settings.SPOTIFY_CLIENT_ID,
        client_secret=settings.SPOTIFY_CLIENT_SECRET,
        redirect_uri=settings.SPOTIFY_REDIRECT_URI,
        scope="user-read-email user-top-read user-read-recently-played",
    )
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

def spotify_callback(request):
    """
    Handles the callback from Spotify after the user logs in, exchanges the authorization code for an access token,
    and redirects to the dashboard.
    """
    sp_oauth = SpotifyOAuth(
        client_id=settings.SPOTIFY_CLIENT_ID,
        client_secret=settings.SPOTIFY_CLIENT_SECRET,
        redirect_uri=settings.SPOTIFY_REDIRECT_URI,
        scope="user-read-email user-top-read user-read-recently-played",
    )
    # Process the request and get the authorization code
    code = request.GET.get('code')

    if code:
        token_info = sp_oauth.get_access_token(code)
        if token_info:
            access_token = token_info['access_token']
            # Store the access token in session for later use
            request.session['access_token'] = access_token
            return redirect('dashboard')

    # If something went wrong, redirect to the login page
    return redirect('login')

def dashboard(request):
    """
    Displays user data (top tracks) on the dashboard after logging in.
    """
    access_token = request.session.get('access_token')

    if not access_token:
        return redirect('login')

    sp = spotipy.Spotify(auth=access_token)
    top_tracks = sp.current_user_top_tracks(limit=10)

    # Render the dashboard with the user's top tracks
    return render(request, 'spotifyWrapped/dashboard.html', {'top_tracks': top_tracks['items']})