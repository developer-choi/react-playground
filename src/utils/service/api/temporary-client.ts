import {customFetchOnClientSide} from '@/utils/extend/library/fetch/client';

export interface PostTemporaryDataParam {
  name: TemporaryDataKey;
  data: any;
}

export async function postTemporaryDataApi(param: PostTemporaryDataParam) {
  return customFetchOnClientSide(`/api/temporary/${param.name}`, {
    method: 'POST',
    authorize: 'none',
    body: param.data
  });
}

export async function deleteTemporaryDataApi(name: TemporaryDataKey) {
  return customFetchOnClientSide(`/api/temporary/${name}`, {
    method: 'DELETE',
    authorize: 'none'
  });
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const TEMPORARY_DATA_KEY = {
  signUpSuccess: 'signup-success'
};

export type TemporaryDataKey = keyof typeof TEMPORARY_DATA_KEY;
