from django.db import models
from django.contrib.auth.models import User

class SpotifyUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='spotify_profile')
    spotify_id = models.CharField(max_length=100, unique=True)
    display_name = models.CharField(max_length=100)
    external_url = models.URLField(null=True, blank=True)
    access_token = models.CharField(max_length=255, blank=True, null=True)
    refresh_token = models.CharField(max_length=255, blank=True, null=True)
    token_expiry = models.DateTimeField(null=True, blank=True)

    # Fields to store various Spotify data points
    top_tracks = models.JSONField(default=list)  # Top tracks
    top_artists = models.JSONField(default=list)  # Top artists
    recent_tracks = models.JSONField(default=list)  # Recently played tracks
    saved_albums = models.JSONField(default=list)  # User saved albums
    saved_tracks = models.JSONField(default=list)  # User saved tracks

    def __str__(self):
        return self.display_name

# Create your models here.
class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)

    def __str__(self):
        return self.name

class Artist(models.Model):
    name = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)

    def __str__(self):
        return self.name
