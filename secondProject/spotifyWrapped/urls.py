from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_page, name='login'),  # Login page
    path('spotify/login/', views.spotify_login, name='spotify_login'),  # Redirect to Spotify for authentication
    path('spotify/callback/', views.spotify_callback, name='spotify_callback'),  # Handle Spotify's callback
    path('dashboard/', views.dashboard, name='dashboard'),  # Dashboard to display user data
]
