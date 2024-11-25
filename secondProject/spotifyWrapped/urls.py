from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet, get_spotify_credentials, get_user_top_songs
from . import views

router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artists')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register, name='register'),
    path('top-songs/', get_user_top_songs, name='get_user_top_songs'),
    # path('api/spotify-credentials/', get_spotify_credentials, name='spotify-credentials'),
]