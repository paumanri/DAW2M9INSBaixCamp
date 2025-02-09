/* Controls personalitzats per al vídeo */
// Obtenim els elements del DOM
const video = document.getElementById('my-video');

const playPauseButton = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

const muteUnmuteButton = document.getElementById('mute-unmute');
const unmuteIcon = document.getElementById('unmute-icon');
const muteIcon = document.getElementById('mute-icon');

const fullscreenButton = document.getElementById('fullscreen');
const volumeSlider = document.getElementById('volume-slider');

// Funció per alternar play/pause
playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playIcon.style.display = 'none'; // Amaga la icona de play
        pauseIcon.style.display = 'block'; // Mostra la icona de pause
    } else {
        video.pause();
        pauseIcon.style.display = 'none'; // Amaga la icona de pause
        playIcon.style.display = 'block'; // Mostra la icona de play
    }
});

// Actualitzar l'estat del botó quan el vídeo s'acabi
video.addEventListener('ended', () => {
    pauseIcon.style.display = 'none'; // Amaga la icona de pause
    playIcon.style.display = 'block'; // Mostra la icona de play
});

// Funció per alternar mute/unmute
muteUnmuteButton.addEventListener('click', () => {
    if (video.muted || video.volume === 0) {
        video.muted = false;
        video.volume = 1; // Restaura el volum a 100%
        unmuteIcon.style.display = 'block'; // Mostra la icona de megàfon
        muteIcon.style.display = 'none'; // Amaga la icona de megàfon tatxat
    } else {
        video.muted = true;
        unmuteIcon.style.display = 'none'; // Amaga la icona de megàfon
        muteIcon.style.display = 'block'; // Mostra la icona de megàfon tatxat
    }
});

// Actualitzar l'estat del botó quan el volum canvia
muteUnmuteButton.addEventListener('volumechange', () => {
    if (video.muted || video.volume === 0) {
        unmuteIcon.style.display = 'none'; // Amaga la icona de megàfon
        muteIcon.style.display = 'block'; // Mostra la icona de megàfon tatxat
    } else {
        unmuteIcon.style.display = 'block'; // Mostra la icona de megàfon
        muteIcon.style.display = 'none'; // Amaga la icona de megàfon tatxat
    }
});

// Funció per activar pantalla completa
fullscreenButton.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Firefox
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // Chrome, Safari, Opera
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE/Edge
        video.msRequestFullscreen();
    }
});

// Control del volum
volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
});

/* Canvi automàtic de l'àudio */
const audioPlayer = document.getElementById("audio-player");
const audioSources = [
    "audio/audioRuffy.mp3",
    "audio/audioZoro.mp3"
];
let currentTrack = 0;

audioPlayer.src = audioSources[currentTrack];

audioPlayer.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % audioSources.length;
    audioPlayer.src = audioSources[currentTrack];
    audioPlayer.load();
    audioPlayer.play();
});

/* Controls per la galeria d'imatges */
const images = document.querySelectorAll(".galeria img");
document.getElementById("zoom-in").addEventListener("click", () => {
    images.forEach(img => img.style.transform = "scale(1.2)");
});

document.getElementById("zoom-out").addEventListener("click", () => {
    images.forEach(img => img.style.transform = "scale(1)");
});