from django.db import models
from django.contrib.auth.models import User

class SpotifyUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='spotify_profile')
    spotify_id = models.CharField(max_length=100, unique=True)
    display_name = models.CharField(max_length=100)
    access_token = models.CharField(max_length=255, blank=True, null=True)
    refresh_token = models.CharField(max_length=255, blank=True, null=True)
    token_expiry = models.DateTimeField(null=True, blank=True)
    spotify_wraps = models.JSONField(default=list)  # For storing past wraps

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
