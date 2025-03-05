import {TemporaryDataKey} from '@/utils/service/api/temporary-client';
import {customFetchOnServerSide} from '@/utils/extend/library/fetch/server';
import {InvalidAccessError} from '@/utils/service/error/server-side';
import {cookies} from 'next/headers';

// TODO 추후 Generic 추가예정
export async function getTemporaryDataApi(name: TemporaryDataKey) {
  try {
    const {json} = await customFetchOnServerSide(`/api/temporary/${name}`, {
      method: 'GET',
      authorize: 'none',
      headers: {
        Cookie: cookies().toString() // 브라우저의 요청으로 server component안에서 route handler를 호출할 때 쿠키가 전달도리 수 있도록 하기위함
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