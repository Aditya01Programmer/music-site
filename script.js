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
  english: ['english-lofi(1).mp3', 'english-lofi(2).mp3'],
  hindi: ['hindi-lofi-1.mp3', 'hindi-lofi-2.mp3', 'hindi-lofi-6.mp3', 'hindi-lofi-4.mp3', 'hindi-lofi-5.mp3'],
  spiritual: ['spiritual-lofi-1.mp3', 'spiritual-lofi-2.mp3', 'spiritual-lofi-3.mp3']
};

// Global functions accessible to HTML inline handlers
function playMusic(type) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.removeEventListener('ended', playNext); // clean up old listener
  }

  currentType = type;
  currentList = songs[type];
  currentIndex = Math.floor(Math.random() * currentList.length);

  console.log("Playing file:", currentList[currentIndex]);

  currentAudio = new Audio(currentList[currentIndex]);
  currentAudio.loop = false;

  // Add listener to auto-play next when song ends
  currentAudio.addEventListener('ended', playNext);

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
  currentIndex = (currentIndex + 1) % currentList.length;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.removeEventListener('ended', playNext); // clean up old listener
  }

  currentAudio = new Audio(currentList[currentIndex]);
  currentAudio.loop = false;
  currentAudio.addEventListener('ended', playNext);
  currentAudio.play().catch(err => console.error('Playback failed:', err));
}

function playPrev() {
  if (!currentList.length) return;
  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.removeEventListener('ended', playNext);
  }

  currentAudio = new Audio(currentList[currentIndex]);
  currentAudio.loop = false;
  currentAudio.addEventListener('ended', playNext);
  currentAudio.play().catch(err => console.error('Playback failed:', err));
}

// Only DOM-dependent code inside window.onload
window.onload = () => {
  const bgToggleBtn = document.getElementById('bgToggle');
  if (bgToggleBtn) {
    bgToggleBtn.addEventListener('click', () => {
      bgIndex = (bgIndex + 1) % backgrounds.length;
      document.body.style.background = backgrounds[bgIndex];
    });
  }
};
const testAudio = new Audio('english-lofi(1).mp3');
testAudio.play().catch(console.error);
