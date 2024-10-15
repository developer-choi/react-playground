import {BoardRow, PatchBoardApiRequest, PostBoardApiRequest} from '@/types/services/board';
import {customFetchOnClientSide, customFetchOnServerSide} from '@/utils/extend/library/fetch';

export function patchBoardApi(board: PatchBoardApiRequest) {
  return customFetchOnClientSide(`/api/board/${board.pk}`, {
    method: 'PATCH',
    body: board,
    authorize: 'none' // 원래는 private 이어야하는데 테스트목적
  });
}
export function postMultipleBoardsApi(boardList: PostBoardApiRequest[]) {
  return customFetchOnClientSide(`/api/board`, {
    method: 'POST',
    body: boardList,
    authorize: 'none' // 원래는 private 이어야하는데 테스트목적
  });
}

export function postBoardApi(board: PostBoardApiRequest) {
  return postMultipleBoardsApi([board]);
}

export function deleteBoardApi(pk: number) {
  return customFetchOnClientSide(`/api/board/${pk}`, {
    method: 'DELETE',
    authorize: 'none' // 원래는 private 이어야하는데 테스트목적
  });
}

export function deleteAllBoardsApi() {
  return customFetchOnClientSide(`/api/board`, {
    method: 'DELETE',
    authorize: 'none' // 원래는 private 이어야하는데 테스트목적
  });
}

export async function getBoardApi(pk: number) {
  const {json} = await customFetchOnServerSide(`/api/board/${pk}`, {
    method: 'GET',
    authorize: 'none' // 원래는 private 이어야하는데 테스트목적
  });

  return json as BoardRow;
}

export async function getBoardListApi(filter?: BoardRow['type']) {
  const {json: {list, currentTime}} = await customFetchOnServerSide(`/api/board`, {
    method: 'GET',
    authorize: 'none', // 원래는 private 이어야하는데 테스트목적
    next: {
      tags: ['boardList'],
    },
    query: {
      filter
    }
  });

  return {
    list: list as BoardRow[],
    currentTime: currentTime as string
  };
}
