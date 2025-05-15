import {TemporaryDataKey} from '@/utils/service/api/temporary-client';
import {customFetchOnServerSide} from '@/utils/extend/library/fetch/server';
import {InvalidAccessError} from '@/utils/service/error/server-side';
import {cookies} from 'next/headers';

interface TemporaryResponse {
  signUpSuccess: {
    email: string;
  }
}

export async function getTemporaryDataApi<K extends TemporaryDataKey>(name: K) {
  try {
    const {data} = await customFetchOnServerSide<TemporaryResponse[K]>(`/api/temporary/${name}`, {
      method: 'GET',
      authorize: 'none',
      headers: {
        Cookie: cookies().toString() // 브라우저의 요청으로 server component안에서 route handler를 호출할 때 쿠키가 전달도리 수 있도록 하기위함
      }
    });

    return data;
  } catch (error: any) {
    if (error.status === 404) {
      throw new InvalidAccessError();
    } else {
      throw error;
    }
  }
}