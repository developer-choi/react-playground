import {customFetchOnClientSide} from '@/utils/extend/library/fetch';

export function getTestStatus401ClientApi() {
  return customFetchOnClientSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}
