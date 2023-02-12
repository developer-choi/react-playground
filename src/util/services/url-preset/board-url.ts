import type {BoardSearchTab, BoardType} from '@type/response-sub/board-sub';
import type {DynamicRouteType} from '@util/services/url-preset/root-url';
import {urlStringify} from '@util/extend/browser/query-string';

const BOARD_URLS = {
  boardType: {
    create: (boardType: BoardType) => `/board/${boardType}/create`,
    list: {
      index: ({boardType, page, searchTab, searchWord}: BoardListUrlParam) => `/board/${boardType}/list/${page}${urlStringify({searchTab, searchWord})}`,
      default: '/board/all/list/1'
    },
    boardNo: ({boardNo, boardType, page}: BoardNoUrlParam) => `/board/${boardType}/${boardNo}${urlStringify({page: page?.toString()})}`,
  }
};

interface BoardListUrlParam {
  boardType: BoardType;
  page: DynamicRouteType;
  searchWord?: string;
  searchTab?: BoardSearchTab;
}

interface BoardNoUrlParam {
  boardType: BoardType;
  boardNo: DynamicRouteType;
  page?: DynamicRouteType;
}

export default BOARD_URLS;
