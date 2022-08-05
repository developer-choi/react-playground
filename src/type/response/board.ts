import type {PagingResponse} from '@type/response/common';
import type {Board, BoardAnother, BoardType} from '@type/response-sub/board-sub';

/** Naming Rule
 * Change path names into Pascal Case + "-Response"
 */

/**
 * Extracted from the contents of the API document on the BoardController.
 */

// GET /board/list
export interface BoardListResponse extends PagingResponse {
  list: Board[]; //The server responds to an empty array even if there are no posts.
}

// GET /board/another
export interface BoardAnothertResponse {
  another: BoardAnother;
}

// GET /board/one
export interface BoardOneResponse {
  pk: number;
  boardType: BoardType;
  dateString: string; //The format is yyyy-mm-dd.
  img?: string; //If the type has an optional, additional comments are recommended. (ex: An image in a post is not a required value.)
}
