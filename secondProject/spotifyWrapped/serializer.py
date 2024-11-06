from rest_framework import serializers
from rest_framework.authtoken.admin import User
from django.contrib.auth.models import User
from . models import Artist, React
import re


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Ensure password is write-only
        }

    def validate_password(self, value):
        # Check for minimum length
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters')

        # Check for at least one uppercase letter
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")

        # Check for at least one special character
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")

        return value

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