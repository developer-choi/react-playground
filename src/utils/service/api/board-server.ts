import {BoardRow} from '@/types/services/board';
import {customFetchOnServerSide} from '@/utils/extend/library/fetch/server';

export async function getBoardApi(pk: number) {
  const {data} = await customFetchOnServerSide<BoardRow>(`/api/board/${pk}`, {
    method: 'GET',
    authorize: 'none' // 원래는 private 이어야하는데 테스트목적
  });

  return data;
}
