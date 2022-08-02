/**
 * /board/list/[page]
 * /board/[boardNo]
 * /board/create
 * /board/modify/[boardNo]
 *
 * "id" is the name of all Dynamic Routes.
 */
const BOARD_URLS = {
  board: {
    list: boardListUrl,
    id: boardOneUrl,
    create: '/board/create',
    modify: boardModifyUrl
  }
};

/** Naming Rule
 * /apple/banana ==> appleBananaUrl()
 * /buy/[productPk] ==> buyIdUrl()
 */
function boardListUrl(page: number | string) {
  return `/board/list/${page}`;
}

function boardOneUrl(boardNo: number | string) {
  return `/board/${boardNo}`;
}

function boardModifyUrl(boardNo: number | string) {
  return `/board/modify/${boardNo}`;
}

export default BOARD_URLS;
