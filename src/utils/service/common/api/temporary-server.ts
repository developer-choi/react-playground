import {TemporaryDataKey} from '@/utils/service/common/api/temporary-client';
import {fetchFromServer} from '@/utils/extend/library/fetch/fromServer';
import {cookies} from 'next/headers';
import {FetchError} from '@/utils/service/common/error/class/fetch';
import {InvalidAccessError} from '@/utils/service/common/error/class/server';

interface TemporaryResponse {
  signUpSuccess: {
    email: string;
  }
}

export async function getTemporaryDataApi<K extends TemporaryDataKey>(name: K) {
  try {
    const {data} = await fetchFromServer<TemporaryResponse[K]>(`/api/temporary/${name}`, {
      method: 'GET',
      authPolicy: 'none',
      headers: {
        Cookie: cookies().toString() // 브라우저의 요청으로 server component안에서 route handler를 호출할 때 쿠키가 전달도리 수 있도록 하기위함
      }
    });

    return data;
  } catch (error) {
    if (!(error instanceof FetchError && error.response.status !== 404)) {
      throw error;
    }

    throw new InvalidAccessError();
  }
}