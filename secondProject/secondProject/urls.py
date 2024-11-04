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
from django.views.static import serve
import os

frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend', 'build')
urlpatterns = [
    # Admin and Home
    path('admin/', admin.site.urls),
    path('', home_view, name='home'),

    # Spotify Authentication and Profile Management
    path('callback/', views.spotify_callback, name='spotify_callback'),
    path('spotify/login/', views.spotify_login, name='spotify_login'),
    path('spotify/profile/', views.profile_page, name='profile_page'),
    path('spotify/logout/', views.logout_view, name='spotify_logout'),
    path('delete_account/', views.delete_account, name='delete_account'),

    # User Authentication API
    path('api/register/', views.register, name='register'),
    path('api/login/', views.user_login, name='login'),

    # Spotify Data and Wraps
    path('unlink_spotify/', views.unlink_spotify, name='unlink_spotify'),
    path('spotify/data', views.spotify_data, name='spotify_data'),
    path('spotify/delete_wrap/<int:wrap_id>/', views.delete_wrap, name='delete_wrap'),
    # Endpoint to fetch and update all Spotify data at once
    path('api/update_spotify_data/', views.update_all_spotify_data, name='update_spotify_data'),

    # API Routes
    path('api/', include('spotifyWrapped.urls')),
    path('api/react/', views.ReactView.as_view(), name='react_view'),
    path('api/artists/', views.ArtistViewSet.as_view({'get': 'list'}), name='artist_view'),
    re_path(r'^.*$', serve, {
        'path': 'index.html',
        'document_root': frontend_dir
    }),

]
