import {PostLoginApiRequest, PostLoginApiResponse} from '@/types/services/auth';
import {customFetchOnClientSide} from '@/utils/extend/library/fetch';

export async function postLoginApi(param: PostLoginApiRequest) {
  const {json} = await customFetchOnClientSide('/api/auth/login', {
    method: 'POST',
    authorize: 'guest',
    body: param
  });

  return json as PostLoginApiResponse;
}
