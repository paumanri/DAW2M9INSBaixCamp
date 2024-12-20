// Constants per a aguardar els diferents elements de la pàgina que estàn al HTML
const btnPlay = document.getElementById('btnPlay');
const btnPause = document.getElementById('btnPause');
const btnMute = document.getElementById('btnMute');
const audio = document.getElementById('audio');
const audioSlider = document.getElementById('audioSlider');
const volumeSlider = document.getElementById('volumeSlider');

// constant per a aguardar el SVG que està a l'HTML
const svgLogoBoxa = document.getElementById('logoBoxa');

// Variables booleanes per a l'estat dels botons
let isPlaying = false;
let isMuted = false;
btnPause.classList.toggle('hidden', !isPlaying);

// Funció per actualitzar la icona PlayPause
function activarDesactivarPlayPause() {
    btnPlay.classList.toggle('hidden', isPlaying);
    btnPause.classList.toggle('hidden', !isPlaying);
}

// Funció per actualitzar la icona Mute
function UpIconaMute() {
    if (isMuted) {
        btnMute.innerHTML = '&#128263;'; // (🔇)
        volumeSlider.value = 0; // El volumeSlider es posa a 0
    } else {
        btnMute.innerHTML = '&#128266;'; // (🔊)
        volumeSlider.value = audio.volume * 100; // El volumeSlider mostra el volum actual
    }
}

// EventListener per reproduir l'àudio i l'animació
btnPlay.addEventListener('click', function() {
    audio.play();

    isPlaying = true;

    activarDesactivarPlayPause();

    // Única acció de Javascript referent a l'animació de l'SVG. Més avall hi ha tot el codi de la funció
    activarDesactivarAnimacio(isPlaying);
});

// EventListener per pusar l'àudio i l'animació
btnPause.addEventListener('click', function() {
    audio.pause();

    isPlaying = false;

    activarDesactivarPlayPause();

    // Única acció de Javascript referent a l'animació de l'SVG. Més avall hi ha tot el codi de la funció
    activarDesactivarAnimacio(isPlaying);
});

// EventListener per activar o desactivar el "Mute"
btnMute.addEventListener('click', function() {
    isMuted = !isMuted;
    audio.muted = isMuted;
    UpIconaMute();
});

// EventListener per actualitzar el audioSlider automàticament
audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    audioSlider.value = progress;
});

// EventListener per actualitzar l'àudio quan l'usuari canvia l'audioSlider
audioSlider.addEventListener('input', function() {
    const value = audioSlider.value;
    audio.currentTime = (value / 100) * audio.duration;
});

// EventListener per ajustar el volum quan l'usuari mogui el volumeSlider
volumeSlider.addEventListener('input', function() {
    if (!isMuted) {
        audio.volume = volumeSlider.value / 100;
    }
});

// EventListener per amagar el btnPause i mostri el btnPlay quan s'acabi l'àudio - Tornarà a estar llest per poder començar a reproduir l'àudio
audio.addEventListener('ended', function() {
    isPlaying = false;
    activarDesactivarPlayPause();
    // Única acció de Javascript referent a l'animació de l'SVG. Més avall hi ha tot el codi de la funció
    activarDesactivarAnimacio(isPlaying);
});

// Funció per activar i desactivar l'animació del SVG
function activarDesactivarAnimacio(isPlaying) {
    if (isPlaying) {
        svgLogoBoxa.classList.add('batec');  // Afegir animació quan l'àudio es reprodueix
    } else {
        svgLogoBoxa.classList.remove('batec');  // Treure animació quan l'àudio es pausa
    }
}
