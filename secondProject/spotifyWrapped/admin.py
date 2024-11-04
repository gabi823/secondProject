from django.contrib import admin
from .models import SpotifyUser

@admin.register(SpotifyUser)
class SpotifyUserAdmin(admin.ModelAdmin):
    list_display = ('display_name', 'spotify_id', 'token_expiry')
    readonly_fields = ('top_tracks', 'top_artists', 'recent_tracks', 'saved_albums', 'saved_tracks')
    def top_tracks_preview(self, obj):
        return obj.top_tracks[:5] if obj.top_tracks else 'No data'
