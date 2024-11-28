from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet, get_spotify_credentials
from . import views

router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artists')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register, name='register'),
    path('top-songs/', views.get_user_top_songs, name='get_user_top_songs'),
    path('top-genres/', views.get_user_top_genres, name='get_user_top_genres'),
    path('top-artists/', views.get_user_top_artists, name='get_user_top_artists'),
    path('top-albums/', views.get_user_top_albums, name='get_user_top_albums'),
    # path('api/spotify-credentials/', get_spotify_credentials, name='spotify-credentials'),
]