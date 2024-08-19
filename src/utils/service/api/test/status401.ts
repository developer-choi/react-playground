import {customFetchOnClientSide, customFetchOnServerSide} from '@/utils/extend/library/fetch';

export async function getTestStatus401ServerApi() {
  return customFetchOnServerSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}

export function getTestStatus401ClientApi() {
  return customFetchOnClientSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}
