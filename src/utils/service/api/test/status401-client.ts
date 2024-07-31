import {customFetchOnClientSide} from '@/utils/extend/api/both';

export function getTestStatus401ClientApi() {
  return customFetchOnClientSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}
