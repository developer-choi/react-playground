'use client';

import {useHandleClientSideError} from '@/utils/service/common/error/client';
import {useCallback} from 'react';
import {Button} from '@forworkchoe/core/components';
import {NotAuthenticatedError} from '@forworkchoe/core/utils';

// URL: http://localhost:3000/staging/error/401/client
export default function Page() {
  const handleClientSideError = useHandleClientSideError();

  const test = useCallback(async () => {
    try {
      throw new NotAuthenticatedError('Login is required');
    } catch (error) {
      handleClientSideError(error);
    }
  }, [handleClientSideError]);

  const onClick = useCallback(() => {
    test();
    test();
    test();
  }, [test]);

  return (
    <Button onClick={onClick}>Click</Button>
  )
}
