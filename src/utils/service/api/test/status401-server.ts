import {customFetchOnServerSide} from '@/utils/extend/api/both';

export async function getTestStatus401ServerApi() {
  return customFetchOnServerSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}
