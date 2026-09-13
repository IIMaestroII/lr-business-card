const video = document.querySelector('.hero-video');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = navigator.connection;
async function startVideo() {
  if (!video.getAttribute('src')) video.src = video.dataset.src;
  video.muted = true;
  try { await video.play(); } catch { /* Keep the poster if autoplay is unavailable. */ }
}
function syncPlayback() {
  if (document.hidden || motion.matches || connection?.saveData) video.pause();
  else startVideo();
}
motion.addEventListener('change', syncPlayback);
connection?.addEventListener('change', syncPlayback);
document.addEventListener('visibilitychange', () => {
  syncPlayback();
});
syncPlayback();
