// music-player
const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const progressBar = document.getElementById("progress-bar");
const progressFill = document.getElementById("progress-bar-fill"); // pink overlay
const Image = document.getElementById("image");
const SongName = document.getElementById("song-name");
const ArtistName = document.getElementById("Artist-name");
const Farward = document.getElementById("farward");
const Backward = document.getElementById("backward");

const songs = [
    {
        name: "/assets/KK  Dil Ibaadat Kar Raha Hai (Lyrical Video)  Emraan Hashmi  Soha Ali Khan  Pritam  Tum Mile - Sony Music India.mp3",
        displayName: "Dil Ibaadat Kar Raha Hai",
        artist: "KK (Emraan Hashmi)",
        image: "/assets/kk.JPG"
    },
    {
        name: "/assets/song1.mp3",
        displayName: "Mann Mera",
        artist: "Artist One",
        image: "/assets/main3.JPG"
    },
    {
        name: "/assets/song3.mp3",
        displayName: "Barishon Mein Jab ",
        artist: "Durshan Raval",
        image: "/assets/barishon.JPG"
    },
    {
        name: "/assets/KK  Tujhe Sochta Hoon (Lyrical Audio) Emraan Hashmi  Esha Gupta  Pritam  Jannat 2 - Sony Music India.mp3",
        displayName: "Tujhe Sochta Hoon",
        artist: "KK (Emraan Hashmi)",
        image: "/assets/Capture.JPG"
    },
    {
        name: "/assets/Dunya - Official Video  Bilawal Sayed Official  Ghani Khan  Da Beghamey lag Khoob - Bilawal Sayed Official.mp3",
        displayName: "Dunya",
        artist: "Bilawal Sayed",
        image: "/assets/dunya.JPG"
    },
    {
        name: "/assets/Rasha pa naz rasha   Ahmed Khan AK & Asif Official music video - mansoor ahmad Khattak.mp3",
        displayName: "Rasha Pa Naz Rasha",
        artist: "Ahmed Khan AK & Asif",
        image: "/assets/rasha.JPG"
    }
];

let currentSongIndex = 0;

function playSong() {
    if (audio.paused) {
        audio.play();
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
    } else {
        audio.pause();
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
    }
}

function loadSong(song) {
    audio.src = song.name;
    Image.src = song.image;
    SongName.textContent = song.displayName;
    ArtistName.textContent = song.artist;
}

Farward.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

Backward.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        progressFill.style.width = `${progressPercent}%`;
    }
});

progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

audio.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});
// Update audio time when user clicks or drags the progress bar
progressBar.addEventListener('input', (e) => {
  const progressValue = e.target.value;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (progressValue / 100) * duration;
  }
});


playButton.addEventListener("click", playSong);

// Initial load
loadSong(songs[currentSongIndex]);
