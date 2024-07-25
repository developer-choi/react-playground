/**
 * document.fullscreen is deprecated.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenElement
 */
export function isVideoInFullscreen() {
  return document.fullscreenElement && document.fullscreenElement.nodeName == 'VIDEO';
}
