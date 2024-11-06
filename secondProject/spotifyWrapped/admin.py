from django.contrib import admin
from .models import SpotifyUser, React, Artist
from django.contrib.auth.models import User

# Register SpotifyUser model
@admin.register(SpotifyUser)
class SpotifyUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_name', 'spotify_id', 'token_expiry')
    readonly_fields = ('top_tracks', 'top_artists', 'recent_tracks', 'saved_albums', 'saved_tracks')
    def top_tracks_preview(self, obj):
        return obj.top_tracks[:5] if obj.top_tracks else 'No data'

# Register React model
@admin.register(React)
class ReactAdmin(admin.ModelAdmin):
    list_display = ('name', 'detail')
    search_fields = ('name', 'detail')

# Register Artist model
@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name', 'genre')
    search_fields = ('name', 'genre')

