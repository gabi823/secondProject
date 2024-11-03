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
    }

    return profile


from sklearn.cluster import KMeans
import numpy as np


# trying out kmeans
def get_listening_personality_ml(user):
    history = ListeningHistory.objects.filter(user=user).select_related('song')
    
    if history.count() < 5:
        return None  # not enough data 
    
    data = []
    for record in history:
        song = record.song
        data.append([
            song.tempo,
            getattr(song, 'energy', 0),
            getattr(song, 'danceability', 0),
            # add other numerical attributes
        ])
    
    X = np.array(data)
    kmeans = KMeans(n_clusters=3)
    kmeans.fit(X)
    
    cluster = kmeans.predict([X.mean(axis=0)])
    
    profile = {
        'cluster': int(cluster[0]),
        'attributes': X.mean(axis=0).tolist(),
    }
    return profile



def get_listening_personality_hierarchical(user):
    # analyze user listening history
    # return a personality profile using Hierarchical Agglomerative Clustering
    history = ListeningHistory.objects.filter(user=user).select_related('song')

    if history.count() < 5:
        return None  # not enough data for algo

    # extract relevant song attributes
    data = []
    for record in history:
        song = record.song
        # make sure all required attrs are present otherwise assign default values if necessary
        tempo = song.tempo
        energy = getattr(song, 'energy', 0)
        danceability = getattr(song, 'danceability', 0)
        # addother numerical attributes as needed

        data.append([tempo, energy, danceability])

    X = np.array(data)

    # feature Scaling
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # assume 3 clusters
    n_clusters = 3

    # init and fit to Agglomerative Clustering model
    hierarchical = AgglomerativeClustering(n_clusters=n_clusters, affinity='euclidean', linkage='ward')
    hierarchical.fit(X_scaled)

    # assign cluster labels to the data points
    labels = hierarchical.labels_

    # analyze cluster memberships
    label_counts = Counter(labels)
    most_common_cluster = label_counts.most_common(1)[0][0]

    # extract songs in the most common cluster
    cluster_songs = X[labels == most_common_cluster]

    # calc average attributes for the personality profile
    average_attributes = cluster_songs.mean(axis=0)

    profile = {
        'cluster': int(most_common_cluster),
        'average_tempo': round(average_attributes[0], 2),
        'average_energy': round(average_attributes[1], 2),
        'average_danceability': round(average_attributes[2], 2),
    }

    return profile
