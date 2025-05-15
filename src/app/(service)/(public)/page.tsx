'use client';

import {useCallback} from 'react';
import {customFetchOnClientSide} from '@/utils/extend/library/fetch/client';
import Button from '@/components/element/Button';

export default function Home() {
  const onClick = useCallback(async () => {
    await customFetchOnClientSide('/api/test/json', {
      method: 'GET',
      authorize: 'none',
      query: {
        type: 'json-number'
      }
    });
  }, []);

  return (
    <Button onClick={onClick}>Click me</Button>
  );
}
