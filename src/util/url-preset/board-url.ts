import type {BoardSearchTab, BoardType} from '@type/response-sub/board-sub';
import type {DynamicRouteType} from '@util/url-preset/root-url';
import {urlStringify} from '@util/extend/query-string';

const BOARD_URLS = {
  board: {
    boardType: {
      create: (boardType: BoardType) => `/board/${boardType}/create`,
      list: ({boardType, page, searchTab, searchWord}: BoardListUrlParam) => `/board/${boardType}/list/${page}${urlStringify({searchTab, searchWord})}`,
      boardNo: ({boardNo, boardType, page}: BoardNoUrlParam) => `/board/${boardType}/${boardNo}${urlStringify({page: page?.toString()})}`,
      defaultList: '/board/all/list/1'
    }
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
