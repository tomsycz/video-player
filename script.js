// DOM ELEMENTS
const player = document.querySelector(".player");
const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullScreenBtn = document.querySelector(".fullscreen");
const speed = document.querySelector(".playback-speed");

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}
// On Video end, show play button icon
video.addEventListener("ended", showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}
// Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
  console.log(newTime);
}

// Volume Controls --------------------------- //
let lastVolume = 1;

function changeVolumeIcon() {
  volumeIcon.className = "";
  if (video.volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (video.volume < 0.7 && video.volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (video.volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
}

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  // change icon depending on volume
  changeVolumeIcon();
  lastVolume = volume;
}

// mute/unmute
function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    changeVolumeIcon();
    volumeIcon.setAttribute("title", "Mute");
  }
}
// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
function openFullscreen(elem) {
  elem.requestFullscreen
    ? elem.requestFullscreen()
    : elem.webkitRequestFullscreen // Safari
    ? elem.webkitRequestFullscreen()
    : elem.msRequestFullscreen(); // IE 11
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  document.exitFullscreen
    ? document.exitFullscreen()
    : document.msExitFullscreen // IE 11
    ? document.msExitFullscreen()
    : document.webkitExitFullscreen(); //Safari
}

let fullscreen = false;

function toggleFullscreen() {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
}

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullScreenBtn.addEventListener("click", toggleFullscreen);
