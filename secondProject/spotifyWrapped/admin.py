from django.contrib import admin
from .models import SpotifyUser

@admin.register(SpotifyUser)
class SpotifyUserAdmin(admin.ModelAdmin):
    list_display = ('display_name', 'spotify_id')
