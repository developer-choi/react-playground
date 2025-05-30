import {LoginApiRequest, LoginApiResponse, SignUpApiRequest} from '@/types/services/auth';
import {cleanFormData} from '@/utils/extend/data-type/object';
import {fetchFromClient} from '@/utils/extend/library/fetch/fromClient';

export async function postLoginApi(param: LoginApiRequest) {
  const {data} = await fetchFromClient<LoginApiResponse>('/api/auth/login', {
    method: 'POST',
    authPolicy: 'guest',
    body: cleanFormData(param)
  });

  return data;
}

export async function postSignUpApi(param: SignUpApiRequest) {
  const {data} = await fetchFromClient('/api/auth/signup', {
    method: 'POST',
    authPolicy: 'guest',
    body: cleanFormData(param)
  });

  return data;
}
