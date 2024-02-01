import type {PagingResponse} from "@type/response/common";
import type {Board} from "@type/response-sub/board-sub";

// GET /board/list
export interface BoardListResponse extends PagingResponse {
  list: Board[]; //The server responds to an empty array even if there are no posts.
}

// GET /board/one
export interface BoardOneResponse {
  board: Board;
}
