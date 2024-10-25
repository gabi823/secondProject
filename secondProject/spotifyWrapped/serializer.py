from rest_framework import serializers
from . models import Artist
from . models import React

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'