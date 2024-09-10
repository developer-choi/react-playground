'use client';

import {useEffect} from 'react';
import {deleteTemporaryDataApi, TemporaryDataKey} from '@/utils/service/api/temporary';

/**
 * Doc: https://docs.google.com/document/d/11KFXo5bfNYhSwa9EgxIinmnHGv9dCivwipBUc0D0pFY/edit
 *
 * TODO
 * 쿠키삭제를 원래는 GET API에서 하고싶었는데,
 * 1. Server Component에서 GET API를 호출할 때는 쿠키 전달이 안되서 처음에 오류가 났고,
 * 2. 1번 과정에서 쿠키를 직접 API 호출할 떄 전달하면 쿠키 전달 자체는 성공했지만 쿠키삭제는 여전히 안됐고,
 * 3. 2번 과정에서 애초에 Server Component도 Server에서 동작하니까 그냥 Server Component에서 직접 삭제하려고했으나 문법 자체가 Server Component에서 삭제하면 안되고 Route Handler나 Server Action 사용하라고 에러가 났고,
 * 4. 그래서 Server Action에서 쿠키삭제 시도했으나 Server Action에서 시도하라는 오류메시지가 나서 해결을 못해서
 * 5. 결국 Client Component 에서 쿠키삭제를 하기로함.
 */
export default function DeleteTemporaryData({name}: {name: TemporaryDataKey}) {
  useEffect(() => {
    deleteTemporaryDataApi(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
