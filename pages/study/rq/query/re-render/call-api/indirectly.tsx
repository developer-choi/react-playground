import React from 'react';
import Button from '@component/atom/element/Button';
import {timeoutPromise, useLogWhenAllRendering} from '@util/extend/test';
import {useQuery} from '@tanstack/react-query';
import {useForceReRender} from '@util/extend/react';

/** Flow
 * 1. 버튼을 매우 빠르게 한 10초정도 지속적으로 광클 ==> API는 더이상 호출되지않음.
 * >> staleTime은 re-rendering될 때 다시 체크되지않음.
 *
 * 2. 탭 전환을 매우 빠르게 시도 ==> API는 stimeTime 주기마다 호출됨.
 * >> staleTime은 refetch될 때 체크됨. (refetchOnWindowFocus)
 * >> isFetching일때는 API가 호출되지않음. (staleTime 삭제하고, 탭전환을 1초안에 100번한다 해도 100번 API 호출되지않음)
 */

// URL: http://localhost:3000/study/rq/query/re-render/call-api/indirectly
export default function Page() {
  const forceReRender = useForceReRender();

  useQuery({
    queryKey: ['call-api/indirectly'],
    queryFn: specialApi,
    refetchOnWindowFocus: true,
    staleTime: 500
  });

  useLogWhenAllRendering('re-rendering');

  return (
    <Button onClick={forceReRender}>Call specialApi (RQ) indirectly</Button>
  );
}

async function specialApi() {
  console.log('The specialApi() called.');
  await timeoutPromise(3000);
  console.log('The specialApi() returned.');
  return new Date().getTime();
}
