import {fetchFromServer} from '@/utils/extend/library/fetch/fromServer';

export async function getTestStatus401ServerApi() {
  return fetchFromServer("/api/random/status-401", {authPolicy: 'private', method: 'GET'});
}
