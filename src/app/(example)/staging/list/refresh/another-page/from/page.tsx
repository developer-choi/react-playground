import React from 'react';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import {getQueryClient} from '@/utils/extend/library/react-query';
import {getBoardListApi} from '@/utils/service/api/board-client';
import AnotherPageRefreshClientList from '@/components/test/AnotherPageRefreshClientList';

export const revalidate = 0;

// 게시글은 http://localhost:3000/staging/list/refresh/test 에서 만듬.
// URL: http://localhost:3000/staging/list/refresh/another-page/from
// Doc: https://docs.google.com/document/d/1ir7P3J1WbsIrqa2vNQ1Co39QYmkV4ef6MHcluH6m90s/edit?tab=t.0#heading=h.fsscmueprjg8
export default async function Page() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['boardList'],
    queryFn: () => getBoardListApi()
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnotherPageRefreshClientList/>
    </HydrationBoundary>
  );
}
