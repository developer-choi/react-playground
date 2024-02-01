import type {BoardSearchTab, BoardType} from "@type/response-sub/board-sub";
import type {DynamicRouteParamType} from "@util/services/path-preset/root-path";
import {urlStringify} from "@util/extend/browser/query-string";

const upperPath = "/board";

const BOARD_PATH = {
  boardType: {
    create: (boardType: BoardType) => upperPath + `/${boardType}/create`,
    list: {
      index: function ({boardType, ...query}: BoardListUrlParam) {
        return upperPath + `/${boardType}/list${urlStringify(query)}`;
      },
      default: upperPath + "/all/list/1"
    },
    boardNo: ({boardNo, boardType}: BoardNoUrlParam) => upperPath + `/${boardType}/${boardNo}`
  }
};

interface BoardListUrlParam {
  boardType: BoardType;
  page: DynamicRouteParamType;
  searchWord?: string;
  searchTab?: BoardSearchTab;
}

interface BoardNoUrlParam {
  boardType: BoardType;
  boardNo: DynamicRouteParamType;
}

export default BOARD_PATH;
