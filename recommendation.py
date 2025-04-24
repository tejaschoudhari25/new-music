import requests
import webbrowser
import time

# Spotify Access Token
ACCESS_TOKEN = "BQDyoT4L-ALZi30OYe_l7CEWP6Zhx2zv7yy8Q6nWQZ4HT6MK4jGAxxoxA4y5OtTQ_nhOOgw4_ycG5IFKgvW0sO-EC8HcboWsyvNMH6HUlat_547FC6x_BxBP0BLqD1ZiuIBBnsmYGLI"  # Replace with your actual token

# Mood-to-Playlist Mapping
mood_to_playlist = {
    1: "7M9YyZeUW75LUUhAWgRf58",  # Sad
    2: "5XGCEyEv01OLSieGQb0L3r",  # Angry
    3: "2N43HIotuWDjlRB4BrUEQR",  # Neutral
    4: "0flG11VjoQPAbseYlWvkBk",  # Happy
    5: "2uEODdOqnVjn2I7hFyam6C",  # Surprise
}

# Function to fetch tracks from a playlist
def fetch_playlist_tracks(playlist_id):
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        tracks = response.json().get("items", [])
        return [track["track"] for track in tracks if track.get("track") and track["track"].get("id")]
    else:
        print(f"Failed to fetch tracks for playlist {playlist_id}: {response.status_code}, {response.text}")
        return []

# Function to redirect to the UI
def redirect_to_ui():
    # The URL for your hosted UI
    ui_url = "https://tejaschoudhari25.github.io/Music-Player/"
    
    # Open the URL in the default web browser
    webbrowser.open(ui_url)
    print("Redirecting to UI...")

# Function to play songs and transition moods automatically
def play_and_transition(initial_mood, songs_per_mood):
    mood_order = list(range(initial_mood, 7))  # Transition from initial_mood to Happy (6)

    print(f"Starting playlist transition from mood {initial_mood} to Happy (6):")

    for mood in mood_order:
        print(f"\nPlaying songs from mood {mood}:")
        current_playlist = fetch_playlist_tracks(mood_to_playlist[mood])

        if not current_playlist:
            print(f"Playlist for mood {mood} is empty. Skipping.")
            continue

        for _ in range(min(songs_per_mood, len(current_playlist))):
            track = current_playlist.pop(0)  # Play songs in order
            print(f"Mood: {mood} - Song: {track['name']}")
            
            # Open song in your personal music player (pass track id or any necessary data to load the song)
            # Update the URL with your music player’s URL, passing the track ID or necessary details
            music_player_url = f"https://tejaschoudhari25.github.io/Music-Player/?track_id={track['id']}"
            webbrowser.open(music_player_url)

            # Sleep for the song duration (approximately 3 minutes in this example, you can adjust it)
            print("Waiting for the next song...")
            time.sleep(180)  # Sleep for 180 seconds (~3 minutes, adjust based on the song's length)

    # After the transition, redirect to the UI
    redirect_to_ui()  # This line redirects to your UI page

# Run the function
play_and_transition(initial_mood=1, songs_per_mood=3)
