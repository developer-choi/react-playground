import React, {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useLogWhenRendering} from '@util/extend/test';
import Button from '@component/atom/element/Button';

/** Flow
 * 1. useQuery()의 enabled, staleTime, refetch 3개 다 어떻게든 패칭안되게하려고 다 써도
 * 2-1 API 호출버튼 (manual fetch)을 호출하면 useQuery()에서 반환하는 데이터도 바뀌고, 당연히 컴포넌트 리렌더링도 된다.
 * 2-2 캐시수정버튼을 (manual modify)을 호출하면 컴포넌트가 리렌더링된다.
 *
 * 교훈: enabled 꺼놔도 컴포넌트가 리렌더링될 수 있음. (같은 쿼리키로 다른데서 API가 응답되던... 직접 캐시가 수정되던...)
 */

// URL: http://localhost:3000/study/rq/query/re-render/force
export default function Page() {
  const queryOption = useMemo(() => ({
    queryKey: ['force'],
    queryFn: getApi,
  }), []);

  const {data, isLoading} = useQuery({
    ...queryOption,
    staleTime: Infinity,
    enabled: false,
    refetchOnWindowFocus: false
  });

  const queryClient = useQueryClient();

  useLogWhenRendering('re-render', data);

  const manualFetch = useCallback(() => {
    queryClient.fetchQuery(queryOption);
  }, [queryClient, queryOption]);

  const manualModify = useCallback(() => {
    queryClient.setQueryData(queryOption.queryKey, () => new Date().getTime());
  }, [queryClient, queryOption.queryKey]);

  return (
    <div>
      <Button onClick={manualFetch}>manual fetch</Button><br/>
      <Button onClick={manualModify}>manual modify</Button><br/>
      {isLoading ? 'Loading...' : data}
    </div>
  );
}

async function getApi() {
  return new Date().getTime();
}
