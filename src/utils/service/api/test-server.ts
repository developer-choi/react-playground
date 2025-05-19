import {customFetchOnServerSide} from '@/utils/extend/library/fetch/server';

export async function getTestStatus401ServerApi() {
  return customFetchOnServerSide("/api/test/status-401", {authPolicy: 'private', method: 'GET'});
}
