import {BoardRow} from '@/types/services/board';
import {fetchFromServer} from '@/utils/extend/library/fetch/fromServer';

export async function getBoardApi(pk: number) {
  const {data} = await fetchFromServer<BoardRow>(`/api/board/${pk}`, {
    method: 'GET',
    authPolicy: 'private' // 원래는 private 이어야하는데 테스트목적
  });

  return data;
}
