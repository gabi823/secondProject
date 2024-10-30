# analytics/services.py
from collections import Counter
from django.db.models import Avg
from listening.models import ListeningHistory
from songs.models import Song

def get_listening_personality(user):
    """
    analyze  user's listening history and return a personality profile.
    """
    history = ListeningHistory.objects.filter(user=user).select_related('song')

    if not history.exists():
        return None  # or return a default profile

    # initialize counters and accumulators
    genres = []
    moods = []
    tempo_sum = 0
    energy_sum = 0
    danceability_sum = 0
    count = history.count()

    for record in history:
        song = record.song
        genres.append(song.genre)
        moods.append(song.mood)
        tempo_sum += song.tempo
        energy_sum += getattr(song, 'energy', 0)  # assuming 'energy' exists
        danceability_sum += getattr(song, 'danceability', 0)  # im assuming 'danceability' exists

    # calc most common genre and mood
    most_common_genre = Counter(genres).most_common(1)[0][0]
    most_common_mood = Counter(moods).most_common(1)[0][0]

    # calc averages
    average_tempo = tempo_sum / count
    average_energy = energy_sum / count
    average_danceability = danceability_sum / count

    # build personality profile
    profile = {
        'genre': most_common_genre,
        'most_common_mood': most_common_mood,
        'average_tempo': round(average_tempo, 2),
        'average_energy': round(average_energy, 2),
        'average_danceability': round(average_danceability, 2),
        # Add other attributes as needed
    }

    return profile
