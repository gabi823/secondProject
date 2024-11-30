"""
URL configuration for secondProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from spotifyWrapped import views
from spotifyWrapped.views import *
from spotifyWrapped.views import fetch_playlist_images
from django.views.static import serve
import os

frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend', 'build')
urlpatterns = [
    # Admin and Home
    path('admin/', admin.site.urls),
    path('api/listening-personality/', views.get_listening_personality, name='get_listening_personality'),
    path('api/', include('spotifyWrapped.urls')),
    path('api/spotify-credentials/', get_spotify_credentials, name='spotify-credentials'),
    path('', home_view, name='home'),

    # Spotify Authentication and Profile Management
    path('spotify-callback/', views.spotify_callback, name='spotify_callback'),
    path('api/spotify/login/', views.spotify_login, name='spotify_login'),
    path('spotify/profile/', views.profile_page, name='profile_page'),
    path('spotify/logout/', views.logout_view, name='spotify_logout'),
    path('api/profile/', views.get_profile, name='get_profile'),
    path('api/update-username/', views.update_username, name='update_username'),
    path('api/update-email/', views.update_email, name='update_email'),
    path('api/logout/', views.logout_view, name='logout_view'),
    path('delete_account/', views.delete_account, name='delete_account'),

    path('api/create-wrapped/', views.create_wrapped, name='create_wrapped'),
    path('api/get-wrapped-data/', views.get_wrapped_data, name='get_wrapped_data'),


    # User Authentication API
    path('api/register/', views.register, name='register'),
    path('api/login/', views.user_login, name='login'),

    # Checking Spotify Link
    path('api/check-spotify-link/', views.check_spotify_link, name='check_spotify_link'),

    # Spotify Data and Wraps
    path('unlink_spotify/', views.unlink_spotify, name='unlink_spotify'),
    path('spotify/data', views.spotify_data, name='spotify_data'),
    path('spotify/delete_wrap/<int:wrap_id>/', views.delete_wrap, name='delete_wrap'),
    # Endpoint to fetch and update all Spotify data at once
    path('api/update_spotify_data/', views.update_all_spotify_data, name='update_spotify_data'),
    path('api/fetch-playlist-images/', fetch_playlist_images, name='fetch_playlist_images'),

    # API Routes
    path('api/react/', views.ReactView.as_view(), name='react_view'),
    path('api/artists/', views.ArtistViewSet.as_view({'get': 'list'}), name='artist_view'),

    # Frontend routes - serve React app
    path('createaccount/', ReactAppView.as_view(), name='create_account'),
    path('login/', ReactAppView.as_view(), name='login'),
    path('about/', ReactAppView.as_view(), name='about'),

    path('api/check-login/', views.check_login, name='check_login'),

    re_path(r'^.*$', ReactAppView.as_view(), name='react_catch_all'),

]
