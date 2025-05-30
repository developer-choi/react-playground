import {BoardListApiResponse, BoardRow, PatchBoardApiRequest, PostBoardApiRequest} from '@/types/services/board';
import {fetchFromClient} from '@/utils/extend/library/fetch/fromClient';
import {customFetchOnBothSide} from '@/utils/extend/library/fetch/base';

export function patchBoardApi(board: PatchBoardApiRequest) {
  return fetchFromClient(`/api/board/${board.pk}`, {
    method: 'PATCH',
    body: board,
    authPolicy: 'none' // 원래는 private 이어야하는데 테스트목적
  });
}
export function postMultipleBoardsApi(boardList: PostBoardApiRequest[]) {
  return fetchFromClient(`/api/board`, {
    method: 'POST',
    body: boardList,
    authPolicy: 'none' // 원래는 private 이어야하는데 테스트목적
  });
}

export function postBoardApi(board: PostBoardApiRequest) {
  return postMultipleBoardsApi([board]);
}

export function deleteBoardApi(pk: number) {
  return fetchFromClient(`/api/board/${pk}`, {
    method: 'DELETE',
    authPolicy: 'none' // 원래는 private 이어야하는데 테스트목적
  });
}

export function deleteAllBoardsApi() {
  return fetchFromClient(`/api/board`, {
    method: 'DELETE',
    authPolicy: 'none' // 원래는 private 이어야하는데 테스트목적
  });
}

export async function getBoardListApi(filter?: BoardRow['type']) {
  const {data} = await customFetchOnBothSide<BoardListApiResponse>(`/api/board`, {
    method: 'GET',
    next: {
      tags: ['board-list'],
    },
    query: {
      filter
    }
  });

  return data;
}
