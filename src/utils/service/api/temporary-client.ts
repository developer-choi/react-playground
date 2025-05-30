import {fetchFromClient} from '@/utils/extend/library/fetch/fromClient';

export interface PostTemporaryDataParam {
  name: TemporaryDataKey;
  data: any;
}

export async function postTemporaryDataApi(param: PostTemporaryDataParam) {
  return fetchFromClient(`/api/temporary/${param.name}`, {
    method: 'POST',
    authPolicy: 'none',
    body: param.data
  });
}

export async function deleteTemporaryDataApi(name: TemporaryDataKey) {
  return fetchFromClient(`/api/temporary/${name}`, {
    method: 'DELETE',
    authPolicy: 'none'
  });
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const TEMPORARY_DATA_KEY = {
  signUpSuccess: 'signup-success'
};

export type TemporaryDataKey = keyof typeof TEMPORARY_DATA_KEY;
