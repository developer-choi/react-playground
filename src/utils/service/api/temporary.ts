import {customFetchOnClientSide, customFetchOnServerSide} from '@/utils/extend/library/fetch';
import {InvalidAccessError} from '@/utils/service/error/server-side';

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

// TODO 추후 Generic 추가예정
export async function getTemporaryDataApi(name: TemporaryDataKey) {
  try {
    const {json} = await customFetchOnServerSide(`/api/temporary/${name}`, {
      method: 'GET',
      authorize: 'none',
      headers: {
        Cookie: require('next/headers').cookies().toString() // 브라우저의 요청으로 server component안에서 route handler를 호출할 때 쿠키가 전달도리 수 있도록 하기위함
      }
    });

    return json;
  } catch (error: any) {
    if (error.status === 404) {
      throw new InvalidAccessError();
    } else {
      throw error;
    }
  }
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
