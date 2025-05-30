import {customFetchOnBothSide} from '@/utils/extend/library/fetch/base';
import {PlainListApiResponse} from '@/types/services/test';
import {fetchFromClient} from '@/utils/extend/library/fetch/fromClient';

export function getTestStatus401ClientApi() {
  return fetchFromClient("/api/test/status-401", {authPolicy: 'private', method: 'GET'});
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
