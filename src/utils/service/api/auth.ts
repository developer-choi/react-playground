import {LoginApiRequest, LoginApiResponse, SignUpApiRequest} from '@/types/services/auth';
import {cleanFormData} from '@/utils/extend/data-type/object';
import {customFetchOnClientSide} from '@/utils/extend/library/fetch/client';

export async function postLoginApi(param: LoginApiRequest) {
  const {data} = await customFetchOnClientSide<LoginApiResponse>('/api/auth/login', {
    method: 'POST',
    authorize: 'guest',
    body: cleanFormData(param)
  });

  return data;
}

export async function postSignUpApi(param: SignUpApiRequest) {
  const {data} = await customFetchOnClientSide('/api/auth/signup', {
    method: 'POST',
    authorize: 'guest',
    body: cleanFormData(param)
  });

  return data;
}
