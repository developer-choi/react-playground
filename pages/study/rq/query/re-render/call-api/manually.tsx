import React, {useCallback} from 'react';
import Button from '@component/atom/element/Button';
import {timeoutPromise, useLogWhenAllRendering} from '@util/extend/test';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

/** Flow
 * 1. mutation 버튼 광클 ==> 클릭한만큼 API 호출됨 & 클릭한만큼 컴포넌트도 렌더링됨 (ㄷㄷ)
 * 2. fetchQuery / prefetchQuery 버튼 광클 ==> isFetching중에는 API 호출안됨 (Gooooooood)
 */

// URL: http://localhost:3000/study/rq/query/re-render/call-api/manually
export default function Page() {
  const mutation = useMutation(someApi);

  useQuery({
    queryKey: ['call-api/manually'],
    queryFn: someApi,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const mutate = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  const mutateAsync = useCallback(() => {
    mutation.mutateAsync();
  }, [mutation]);

  const fetchQuery = useCallback(() => {
    queryClient.fetchQuery({
      queryKey: ['call-api/manually'],
      queryFn: someApi,
    });
  }, [queryClient]);

  const prefetchQuery = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ['call-api/manually'],
      queryFn: someApi,
    });
  }, [queryClient]);

  useLogWhenAllRendering('re-rendering');

  return (
    <>
      <Button onClick={mutate}>Call someApi by mutate</Button>
      <Button onClick={mutateAsync}>Call someApi by mutateAsync</Button>
      <Button onClick={fetchQuery}>Call someApi by fetchQuery</Button>
      <Button onClick={prefetchQuery}>Call someApi by prefetchQuery</Button>
    </>
  );
}

async function someApi() {
  console.log('The someApi() called.');
  await timeoutPromise(3000);
  console.log('The someApi() returned.');
  return new Date().getTime();
}
