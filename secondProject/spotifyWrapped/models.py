from django.db import models
from django.contrib.auth.models import User


class SpotifyUser(models.Model):
    """
    Model to store Spotify user data and authentication information.
    Links a Django user account with their Spotify account details.
    """
    # Django User relationship
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='spotify_profile'
    )

    # Spotify Account Identifiers
    spotify_id = models.CharField(
        max_length=100,
        unique=True,
        help_text="Spotify's unique identifier for the user"
    )
    spotify_username = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="User's Spotify username"
    )
    display_name = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="User's display name on Spotify"
    )

    # Spotify Profile Data
    external_url = models.URLField(
        null=True,
        blank=True,
        help_text="URL to user's Spotify profile"
    )
    profile_image_url = models.URLField(
        null=True,
        blank=True,
        help_text="URL to user's Spotify profile image"
    )

    # Authentication
    access_token = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    refresh_token = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    token_expiry = models.DateTimeField(
        null=True,
        blank=True
    )

    # Spotify Data Collections
    top_tracks = models.JSONField(
        default=list,
        help_text="User's top tracks from Spotify"
    )
    top_artists = models.JSONField(
        default=list,
        help_text="User's top artists from Spotify"
    )
    recent_tracks = models.JSONField(
        default=list,
        help_text="User's recently played tracks"
    )
    saved_albums = models.JSONField(
        default=list,
        help_text="User's saved albums"
    )
    saved_tracks = models.JSONField(
        default=list,
        help_text="User's saved tracks"
    )

    class Meta:
        verbose_name = "Spotify User"
        verbose_name_plural = "Spotify Users"

    def __str__(self):
        return f"{self.display_name or self.spotify_username or self.spotify_id}"


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
