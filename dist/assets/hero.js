const video = document.querySelector('.hero-video');
const toggle = document.querySelector('.video-toggle');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = navigator.connection;
let manuallyPaused = false;

function updateLabel() {
  toggle.textContent = video.paused ? 'Включить видео' : 'Пауза видео';
}
async function startVideo() {
  if (!video.getAttribute('src')) video.src = video.dataset.src;
  video.muted = true;
  try { await video.play(); } catch { updateLabel(); }
}
toggle.hidden = false;
toggle.addEventListener('click', () => {
  manuallyPaused = !video.paused;
  if (video.paused) startVideo(); else video.pause();
});
video.addEventListener('play', updateLabel);
video.addEventListener('pause', updateLabel);
video.addEventListener('error', () => {
  toggle.textContent = 'Видео недоступно';
  toggle.disabled = true;
});
motion.addEventListener('change', () => { if (motion.matches) video.pause(); });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) video.pause();
  else if (!manuallyPaused && !motion.matches && !connection?.saveData) startVideo();
});
if (!motion.matches && !connection?.saveData) startVideo();
