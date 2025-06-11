const backgrounds = [
  "linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(120deg, #c2e9fb 0%, #a1c4fd 100%)"
];

let bgIndex = 0;

let currentAudio = null;
let currentList = [];
let currentType = '';
let currentIndex = 0;

const songs = {
  english: ['english-lofi-1.mp3', 'english-lofi-2.mp3' , 'english-lofi-3.mp3' , 'english-lofi-4.mp3' , 'english-lofi-5.mp3'],
  hindi: ['hindi-lofi-1.mp3', 'hindi-lofi-2.mp3', 'hindi-lofi-6.mp3', 'hindi-lofi-4.mp3', 'hindi-lofi-5.mp3' , 'hindi-lofi-7.mp3' ,'hindi-lofi-8.mp3' ,'hindi-lofi-9.mp3'],
  spiritual: ['spiritual-lofi-1.mp3', 'spiritual-lofi-2.mp3', 'spiritual-lofi-3.mp3' ,'spiritual-lofi-4.mp3' ,'spiritual-lofi-5.mp3']
};
function shuffle(array) {
  let copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function onPlay() {
  document.body.classList.add('music-playing');
}

function onPause() {
  document.body.classList.remove('music-playing');
}

function attachAudioListeners(audio) {
  audio.addEventListener('ended', playNext);
  audio.addEventListener('play', onPlay);
  audio.addEventListener('pause', onPause);
}

function playMusic(type) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentType = type;
  currentList = shuffle(songs[type]); // 🎯 Shuffling once
  currentIndex = 0;

  playCurrentSong();
}
function playCurrentSong() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.removeEventListener('ended', playNext);
    currentAudio.removeEventListener('play', onPlay);
    currentAudio.removeEventListener('pause', onPause);
  }

  const song = currentList[currentIndex];
  currentAudio = new Audio(song);
  currentAudio.loop = false;
  attachAudioListeners(currentAudio);
  currentAudio.play().catch(err => console.error('Playback failed:', err));
}

function togglePlayPause() {
  if (!currentAudio) return;
  if (currentAudio.paused) {
    currentAudio.play();
  } else {
    currentAudio.pause();
  }
}
function playNext() {
  if (!currentList.length) return;

  currentIndex++;
  if (currentIndex >= currentList.length) {
    currentList = shuffle(currentList); // 🎯 Reshuffle once full list is played
    currentIndex = 0;
  }

  playCurrentSong();
}
function playPrev() {
  if (!currentList.length) return;

  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  playCurrentSong();
}
