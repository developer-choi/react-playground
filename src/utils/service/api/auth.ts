import {LoginApiRequest, LoginApiResponse, SignUpApiRequest} from '@/types/services/auth';
import {cleanFormData} from '@/utils/extend/data-type/object';
import {customFetchOnClientSide} from '@/utils/extend/library/fetch/client';

export async function postLoginApi(param: LoginApiRequest) {
  const {json} = await customFetchOnClientSide('/api/auth/login', {
    method: 'POST',
    authorize: 'guest',
    body: cleanFormData(param)
  });

  return json as LoginApiResponse;
}

export async function postSignUpApi(param: SignUpApiRequest) {
  const {json} = await customFetchOnClientSide('/api/auth/signup', {
    method: 'POST',
    authorize: 'guest',
    body: cleanFormData(param)
  });

  return json;
}
