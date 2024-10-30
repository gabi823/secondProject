from django.db import models
from django.contrib.auth.models import User

class PersonalityProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    genre = models.CharField(max_length=100)
    most_common_mood = models.CharField(max_length=100)
    average_tempo = models.FloatField()
    average_energy = models.FloatField()
    average_danceability = models.FloatField()
    # Add other attributes as needed

    def __str__(self):
        return f"Profile of {self.user.username}"
