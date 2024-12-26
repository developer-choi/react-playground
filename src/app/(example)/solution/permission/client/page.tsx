'use client';

import {Permission} from '@/utils/extend/permission';
import Button from '@/components/element/Button';
import {useCallback} from 'react';
import {customFetchOnClientSide} from '@/utils/extend/library/fetch';
import {useHandleClientSideError} from '@/utils/service/error/client-side';
import {useMutation} from '@tanstack/react-query';

// URL: http://localhost:3000/solution/permission/client
// Doc: [Permission Algorithm] https://docs.google.com/document/d/1Adprw6cjDQh2suSOCBuD2UuH6sIZjbyHa-w5sk9gDWs/edit?tab=t.0
export default function Page() {
  const handleClientSideError = useHandleClientSideError();
  const {isPending, mutateAsync} = useMutation({
    mutationFn: someApi
  });
  
  const tryAction = useCallback(async () => {
    try {
      await mutateAsync();
    } catch (error) {
      handleClientSideError(error);
    }
  }, [handleClientSideError, mutateAsync]);
  
  return (
    <Button onClick={tryAction} loading={isPending}>{REQUEST_PERMISSION}</Button>
  );
}

/**
 * 1. API 호출 전에 프론트에서 걸리던가 (여기 코드수정)
 * 2. API 응답 왔는데 403이던가 (/app/permission/route.ts 코드수정)
 *
 * 둘 다 에러처리는 똑같아야함. 권한없다고 피드백주기.
 */
function someApi() {
  return customFetchOnClientSide(`/api/permission`, {
    method: 'POST',
    body: [],
    authorize: 'none',
    permission: 'DASHBOARD.PAYMENT:CREATE'
    // permission: 'DASHBOARD.COMMUNITY:CREATE'
  });
}

const REQUEST_PERMISSION: Permission = 'DASHBOARD.PAYMENT:CREATE';
