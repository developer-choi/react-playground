'use client';

import {getTestStatus401ClientApi} from '@/utils/service/api/test-client';
import {useCallback} from 'react';
import {useHandleClientSideError} from '@/utils/service/error/client';

// URL: http://localhost:3000/error/client
export default function Status401CC() {
  const handleClientSideError = useHandleClientSideError();
  
  const onClick = useCallback(async () => {
    try {
      await Promise.all([
        getTestStatus401ClientApi(),
        getTestStatus401ClientApi(),
        getTestStatus401ClientApi(),
        getTestStatus401ClientApi()
      ]);
    } catch (error) {
      handleClientSideError(error);
    }
  }, [handleClientSideError]);

  return (
    <button onClick={onClick}>Click Me</button>
  );
}
