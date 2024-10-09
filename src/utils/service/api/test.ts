import {customFetchOnBothSide, customFetchOnClientSide, customFetchOnServerSide} from '@/utils/extend/library/fetch';
import {PlainListApiResponse} from '@/types/services/test';

export async function getTestStatus401ServerApi() {
  return customFetchOnServerSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}

export function getTestStatus401ClientApi() {
  return customFetchOnClientSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}

export async function getTestPlainListApi(page: number) {
  const {json} = await customFetchOnBothSide('/api/test/plain-list', {
    method: 'GET',
    query: {
      page
    }
  });

  return json as PlainListApiResponse;
}
