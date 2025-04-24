// Function to get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to fetch and play song using the track ID
function playSong(trackId) {
  if (trackId) {
    // This is where you would get the actual song URL from Spotify
    const trackUrl = `https://api.spotify.com/v1/tracks/${trackId}`; // Example API URL

    // Fetch song details from Spotify using the track ID
    fetch(trackUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with your actual access token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const songTitle = data.name;
        const songPreviewUrl = data.preview_url; // Use preview_url or actual URL if available

        // Update the displayed song title
        console.log("Playing song:", songTitle);

        // Set the audio source to the preview URL or actual song URL
        const audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.src = songPreviewUrl;
        audioPlayer.play(); // Play the song
      })
      .catch((error) => console.log("Error fetching song data:", error));
  } else {
    console.log("Track ID not found in the URL");
  }
}

// Load the camera feed
const video = document.getElementById("camera");
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err) {
      console.error("Camera access error:", err);
    });
}

const moodPlaylists = {
  happy: ["Happy Song 1", "Happy Song 2", "Happy Song 3"],
  sad: ["Sad Song 1", "Sad Song 2", "Sad Song 3"],
  angry: ["Angry Song 1", "Angry Song 2", "Angry Song 3"],
  neutral: ["Neutral Song 1", "Neutral Song 2", "Neutral Song 3"],
  surprise: ["Surprise Song 1", "Surprise Song 2", "Surprise Song 3"],
};

// Function to handle mood selection
function selectMood(button, mood) {
  // Highlight active mood button
  document.querySelectorAll(".mood-buttons button").forEach((btn) => {
    btn.classList.remove("active");
  });
  button.classList.add("active");

  // Load playlist
  const playlistDiv = document.getElementById("playlist");
  playlistDiv.innerHTML = "";
  moodPlaylists[mood].forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.className = "song";
    songDiv.textContent = `${index + 1}. ${mood} Song ${index + 1}`;
    playlistDiv.appendChild(songDiv);
  });

  // Update the displayed dominant emotion
  document.getElementById(
    "dominant-emotion"
  ).textContent = `Dominant Emotion: ${mood}`;
}

// Initialize with happy mood
window.addEventListener("DOMContentLoaded", () => {
  const happyButton = document.querySelector('[data-mood="happy"]');
  if (happyButton) {
    selectMood(happyButton, "happy");
  }

  // Fetch the track_id from URL and play the song
  const trackId = getQueryParam("track_id");
  playSong(trackId);
});

// Add click event for capture button
document.querySelector(".capture-btn").addEventListener("click", () => {
  // In a real app, this would analyze the facial expression
  // For now, just show a message
  document.getElementById("dominant-emotion").textContent =
    "Dominant Emotion: Analyzing...";

  // Simulate analysis completion after 1 second
  setTimeout(() => {
    const moods = ["happy", "sad", "angry", "neutral", "surprise"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    // Update display and select the corresponding mood button
    document.getElementById(
      "dominant-emotion"
    ).textContent = `Dominant Emotion: ${randomMood}`;
    const moodButton = document.querySelector(`[data-mood="${randomMood}"]`);
    if (moodButton) {
      selectMood(moodButton, randomMood);
    }
  }, 1000);
});
