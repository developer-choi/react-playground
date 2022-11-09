import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {QueryFunction, QueryKey, useQuery} from '@tanstack/react-query';
import type {ParsedUrlQuery} from 'querystring';

export default function Page() {
  const {isReady, query} = useRouter();

  useEffect(() => {
    /** Case1
     * http://localhost:3000/examples/next/full-client-side/query?key=value
     *
     * isReady false {}
     * isReady true {key: 'value'}
     */

    /** Case2
     * http://localhost:3000/examples/next/full-client-side/query
     *
     * isReady true {}
     */
    console.log('isReady', isReady, query);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  // useRealQueryInGetStaticProps();

  return (
    <>
    </>
  );
}

function useRealQueryInGetStaticProps() {
  const {isReady, query} = useRouter();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    // 이떄부터 진짜로 쿼리스트링이 비어있는지 아닌지를 알 수 있게됨.
    if (Object.keys(query).length === 0) {
      console.log('The query is really empty', query);
      return;
    }

    console.log('The query is not really empty', query);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);
}

interface UseSomeGetQueryParameter<K extends QueryKey, Q> {
  readyToFetch: ((query: ParsedUrlQuery) => boolean) | boolean;
  getQueryParameter: (query: ParsedUrlQuery) => {
    queryKey: K;
    queryFn: QueryFunction<Q, K>;
  };
}

// query가 진짜로 유효한 경우에만 fetch를 할 수 있도록 만든 공통 hooks
function useSomeGetQuery<K extends QueryKey, Q>({getQueryParameter, readyToFetch}: UseSomeGetQueryParameter<K, Q>) {
  const {query, isReady} = useRouter();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    /**
     * 만약 여기서 리다이랙트를 하고싶다면, 여기서 실행.
     * if(query.page !== 숫자형) {
     *   replace('/list?page=1');
     * }
     *
     * if(query.boardPk !== 숫자형) {
     *   alert('해당 게시글은 삭제되었거나 없음.');
     *   replace('/list?page=1')
     * }
     */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const enabled = isReady && ((typeof readyToFetch === 'function') ? readyToFetch(query) : readyToFetch);
  const {queryKey, queryFn} = getQueryParameter(query);

  // query가 유효한걸로 판단되기전까지는 API호출이 안되도록 enabled 설정.
  return useQuery(queryKey, queryFn, {
    enabled
  });
}
