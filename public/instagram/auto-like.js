/**
 * I made it to like all posts on Instagram.
 * How to use: Ctrl+A Ctrl+C, then go to the Instagram user's homepage and Ctrl+V in the developer tool console window.
 */

const SETTINGS = {
  getPostDuration: 4000,
  clickDuration: 500,
  likeDuration: 3000
};

async function main() {
  await openPopup();
  await likeLoop();
}

/*****************************************************************************
 *
 ******************************************************************************/

async function openPopup() {
  const openPopupElement = document.querySelector('._bz0w > a');
  openPopupElement.click();
  await timeoutPromise(SETTINGS.getPostDuration);
}

async function nextPost() {
  const nextElement = document.querySelector('.coreSpriteRightPaginationArrow');
  nextElement.click();
}

async function likeLoop() {
  while(true) {
    if (!isLiked()) {
      const likeButtonElement = document.querySelector('.fr66n button');
      likeButtonElement.click();
      await timeoutPromise(SETTINGS.likeDuration);
    }
    
    await nextPost();
    await timeoutPromise(SETTINGS.getPostDuration);
  }
}

function timeoutPromise(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function isLiked() {
  return document.querySelector('.fr66n svg').ariaLabel === 'Unlike';
}

/*****************************************************************************
 *
******************************************************************************/

main().then();
