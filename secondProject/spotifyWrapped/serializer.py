from rest_framework import serializers
from rest_framework.authtoken.admin import User
from django.contrib.auth.models import User
from . models import Artist, React
from .models import SpotifyWrapped


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Ensure password is write-only
        }

    def create(self, validated_data):
        # Create a new user with hashed password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'

class SpotifyWrappedSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyWrapped
        fields = ['id', 'name', 'time_range', 'top_track_name', 'album_cover_url', 'date_created']