import React, {useCallback} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {timeoutPromise, useLogWhenRendering} from '@util/extend/test';
import Button from '@component/atom/element/Button';

/** Flow
 * 1. 최초에
 * 2. 10초동안 매우빠르게 지속적으로 버튼 광클하면,
 * 3. 최초 API의 isFetching하는동안에 API 호출안됨. (TTFB 1초 설정한 내내 아무리많이 광클해도!!) > 기본동작임.
 * 4. API가 응답된 이후 8초가 지나지않으면 버튼 계속 클릭해도 API 호출안됨 > fetchQuery({staleTime})의 동작
 */

// URL: http://localhost:3000/study/rq/query/re-render/call-api/manually-stale
export default function Page() {
  const queryClient = useQueryClient();

  const {data} = useQuery({
    queryKey: ['call-api/manually'],
    queryFn: someApi,
    staleTime: 2000, //이건 refetch할때만 의미가있어서, refetch옵션 밑에서 꺼놓고 manually fetch를 그 밑에서 하기때문에 의미없는코드임.
    refetchOnWindowFocus: false
  });

  const fetchQuery = useCallback(() => {
    queryClient.fetchQuery({
      queryKey: ['call-api/manually'],
      queryFn: someApi,
      staleTime: 8000
    });
  }, [queryClient]);

  useLogWhenRendering('re-rendering', data);

  return (
    <Button onClick={fetchQuery}>Call someApi by fetchQuery</Button>
  );
}

async function someApi() {
  console.log('The someApi() called.');
  await timeoutPromise(1000);
  console.log('The someApi() returned.');
  return new Date().getTime();
}
