//your JS code here. If required.
// Elements
const video = document.getElementById('video');
const audio = document.getElementById('audio');
const playBtn = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeBtns = {
  smaller: document.getElementById('smaller-mins'),
  medium: document.getElementById('medium-mins'),
  long: document.getElementById('long-mins')
};
const soundBtns = {
  beach: document.getElementById('sound1'),
  rain: document.getElementById('sound2')
};

// Media sources
const sources = {
  beach: {
    audio: 'Sounds/beach.mp3',
    video: 'video/beach.mp4'
  },
  rain: {
    audio: 'Sounds/rain.mp3',
    video: 'video/rain.mp4'
  }
};

// State
let duration = 600; // default 10 min in seconds
let timer = null;
let currentSound = 'beach';
let isPlaying = false;

// Helper: format time as mm:ss
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Set initial time display
timeDisplay.textContent = formatTime(duration);

// Play/Pause logic
function playMedia() {
  video.play();
  audio.play();
  playBtn.textContent = 'Pause';
  isPlaying = true;
  startTimer();
}

function pauseMedia() {
  video.pause();
  audio.pause();
  playBtn.textContent = 'Play';
  isPlaying = false;
  stopTimer();
}

function startTimer() {
  stopTimer();
  let timeLeft = duration;
  timeDisplay.textContent = formatTime(timeLeft);
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      pauseMedia();
      video.currentTime = 0;
      audio.currentTime = 0;
      timeDisplay.textContent = formatTime(duration);
    }
  }, 1000);
}

function stopTimer() {
  if (timer) clearInterval(timer);
  timer = null;
}

// Play button event
playBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseMedia();
  } else {
    playMedia();
  }
});

// Time selection
function setActiveTimeBtn(activeId) {
  Object.entries(timeBtns).forEach(([key, btn]) => {
    btn.classList.toggle('active', btn.id === activeId);
  });
}

timeBtns.smaller.addEventListener('click', () => {
  duration = 120;
  setActiveTimeBtn('smaller-mins');
  timeDisplay.textContent = formatTime(duration);
  if (isPlaying) {
    pauseMedia();
    video.currentTime = 0;
    audio.currentTime = 0;
  }
});
timeBtns.medium.addEventListener('click', () => {
  duration = 300;
  setActiveTimeBtn('medium-mins');
  timeDisplay.textContent = formatTime(duration);
  if (isPlaying) {
    pauseMedia();
    video.currentTime = 0;
    audio.currentTime = 0;
  }
});
timeBtns.long.addEventListener('click', () => {
  duration = 600;
  setActiveTimeBtn('long-mins');
  timeDisplay.textContent = formatTime(duration);
  if (isPlaying) {
    pauseMedia();
    video.currentTime = 0;
    audio.currentTime = 0;
  }
});

// Set default active time button
setActiveTimeBtn('long-mins');

// Sound selection
function setActiveSoundBtn(activeBtn) {
  Object.entries(soundBtns).forEach(([key, btn]) => {
    btn.classList.toggle('active', btn === activeBtn);
  });
}

soundBtns.beach.addEventListener('click', () => {
  currentSound = 'beach';
  audio.src = sources.beach.audio;
  video.src = sources.beach.video;
  setActiveSoundBtn(soundBtns.beach);
  if (isPlaying) {
    audio.play();
    video.play();
  }
});
soundBtns.rain.addEventListener('click', () => {
  currentSound = 'rain';
  audio.src = sources.rain.audio;
  video.src = sources.rain.video;
  setActiveSoundBtn(soundBtns.rain);
  if (isPlaying) {
    audio.play();
    video.play();
  }
});

// Set default active sound button
setActiveSoundBtn(soundBtns.beach);

// Reset video/audio on end (should not happen due to loop, but just in case)
video.addEventListener('ended', () => {
  if (isPlaying) video.play();
});
audio.addEventListener('ended', () => {
  if (isPlaying) audio.play();
});
