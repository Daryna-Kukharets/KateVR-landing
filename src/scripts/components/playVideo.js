export function playVideo() {
  const video = document.querySelector('.video');
  const playVideo = document.querySelectorAll('.play');
  const videoClose = document.querySelector('.video__close');
  const iframe = document.querySelector('.video__iframe');

  playVideo.forEach((buttonPlay) => {
    buttonPlay.addEventListener('click', () => {
      video.classList.add('video--active');

      if (iframe && !iframe.src) {
        iframe.src = iframe.getAttribute('data-src');
      }
    });
  });

  function closeVideo() {
    video.classList.remove('video--active');

    if (iframe) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*',
      );
    }
  }

  videoClose.addEventListener('click', closeVideo);
  video.addEventListener('click', closeVideo);
}
