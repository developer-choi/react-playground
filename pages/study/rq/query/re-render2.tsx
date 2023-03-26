import React, {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useLogWhenRendering} from '@util/extend/test';
import Button from '@component/atom/element/Button';

// URL: http://localhost:3000/study/rq/query/re-render2
export default function Page() {
  const queryOption = useMemo(() => ({
    queryKey: ['fix-query-key'],
    queryFn: getApi,
  }), []);

  const {data, isLoading} = useQuery({
    ...queryOption,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  useLogWhenRendering('re-render', data);

  /**
   * useQuery Option 으로 refetch가 일어나지않게 설정하더라도,
   * 수동으로 prefetch, fetch를 하면 useQuery().data로 리렌더링이 발생함.
   */
  const manualPrefetch = useCallback(() => {
    queryClient.prefetchQuery(queryOption);
  }, [queryClient, queryOption]);

  const manualFetch = useCallback(() => {
    queryClient.fetchQuery(queryOption);
  }, [queryClient, queryOption]);

  return (
    <div>
      <Button onClick={manualPrefetch}>manual prefetch</Button><br/>
      <Button onClick={manualFetch}>manual fetch</Button><br/>
      {isLoading ? 'Loading...' : data}
    </div>
  );
}

async function getApi() {
  return new Date().getTime();
}
