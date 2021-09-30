import type {PagingResponse} from '@type/response/common';
import type {Board, BoardAnother} from '@type/response-sub/board-sub';

/** Naming Rule
 * Change path names into Pascal Case + "-Response"
 */

// GET /board/list
export interface BoardListResponse extends PagingResponse {
  list: Board[];
}

// GET /board/another
export interface BoardAnothertResponse {
  another: BoardAnother;
}
