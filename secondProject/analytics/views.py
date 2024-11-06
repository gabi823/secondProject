from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from analytics.services import get_listening_personality

def get_artist_top_tracks(access_token, artist_id, country='US'):
    top_tracks_url = f'https://api.spotify.com/v1/me/player/recently-played'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    params = {
        'country': country
    }
    
    response = requests.get(top_tracks_url, headers=headers, params=params)
    
    if response.status_code == 200:
        tracks = response.json().get('tracks', [])
        print(f"Top Tracks for Artist ID {artist_id}:")
        for idx, track in enumerate(tracks, start=1):
            print(f"{idx}. {track['name']} (Popularity: {track['popularity']})")
    else:
        print("Failed to retrieve top tracks.")
        print("Status Code:", response.status_code)
        print("Response:", response.text)



@login_required
def listening_personality_view(request):
    user = request.user
    profile = get_listening_personality(user)

    # get_artist_top_tracks(access_token, artist_id)
    
    context = {
        'profile': profile
    }
    return render(request, 'analytics/listening_personality.html', context)
