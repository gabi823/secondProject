from django.db import models


class SpotifyUser(models.Model):
    spotify_id = models.CharField(max_length=100, unique=True)
    display_name = models.CharField(max_length=100)
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255)
    token_expiry = models.DateTimeField(null=True, blank=True)
    spotify_wraps = models.JSONField(default=list)  # For storing past wraps

    def __str__(self):
        return self.display_name
