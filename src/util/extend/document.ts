/**
 * document.fullscreen is deprecated.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenElement
 */
export function isVideoInFullscreen() {
  if (document.fullscreenElement && document.fullscreenElement.nodeName == 'VIDEO') {
    return true;
  }
  return false;
}
