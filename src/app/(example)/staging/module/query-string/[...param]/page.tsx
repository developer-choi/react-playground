'use client';

import {usePathname, useSearchParams} from 'next/navigation';
import React, {useCallback} from 'react';
import {Button} from '@forworkchoe/core';
import {useNavigation} from '@/utils/extend/browser/query-string/useNavigation';
import {fetchFromClient} from '@/utils/extend/library/fetch/fromClient';

/**
 * URL: http://localhost:3000/staging/module/query-string/test
 *
 * 총 2가지 테스트가 있음.
 * 1. Client Side에서 쿼리스트링을 잘 가져오는지
 * 2. API 호출 시 쿼리스트링이 잘 넘어가는지
 *
 * 불필요한 값 (null, undefined)이나 특수한 값 (배열)을 쿼리스트링으로 변환했을 때 변환이 잘 되는지도 같이 구현했음.
 */
export default function Page() {
  const searchParams = useSearchParams();
  const keys = searchParams.keys();
  const query = Object.fromEntries(Array.from(keys).map(key => [key, searchParams.getAll(key)]));
  const pathname = usePathname();
  console.log('query', query);

  const callApi = useCallback(async () => {
    const {data} = await fetchFromClient('/api/random/query-string', {
      method: 'GET',
      authPolicy: 'none',
      query: TEST_QUERY
    });

    console.log('data', data);
  }, []);

  const {replace} = useNavigation();

  const moveAnotherPage = useCallback(() => {
    replace({
      pathname: '/staging/module/query-string/next',
      query: TEST_QUERY
    });
  }, [replace]);

  return (
    <>
      <div>pathname = {pathname}</div>
      <div>{JSON.stringify(query)}</div>
      <Button onClick={callApi}>Call API</Button>
      <Button onClick={moveAnotherPage}>Replace</Button>
    </>
  );
}

const TEST_QUERY = {
  key1: null,
  key2: undefined,
  key3: '',
  key4: 3,
  key5: 'hello',
  key6: [1, 2, 3, 4, 5],
  key7: true,
  key8: false,
  key9: '한 글'
};
