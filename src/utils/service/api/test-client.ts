import {customFetchOnBothSide} from '@/utils/extend/library/fetch';
import {PlainListApiResponse} from '@/types/services/test';
import {customFetchOnClientSide} from '@/utils/extend/library/fetch/client';

export function getTestStatus401ClientApi() {
  return customFetchOnClientSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}

export async function getTestPlainListApi(page: number) {
  const {data} = await customFetchOnBothSide<PlainListApiResponse>('/api/test/plain-list', {
    method: 'GET',
    query: {
      page
    }
  });
  return data;
}
