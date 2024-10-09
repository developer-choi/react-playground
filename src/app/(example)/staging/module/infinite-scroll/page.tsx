import {getTestPlainListApi} from '@/utils/service/api/test';
import React from 'react';
import Link from 'next/link';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import ClientListPage from '@/components/test/ClientListPage';
import {getQueryClient} from '@/utils/extend/library/react-query';

/**
 * URL: http://localhost:3000/staging/module/infinite-scroll
 * Doc: [Infinite Scroll] https://docs.google.com/document/d/1IeMIvPc-18TKEscvuRYmktziMxieeKW_wJGB779nOXg/edit
 * Doc: [useInfiniteQuery] https://docs.google.com/document/d/1T73VImuRBctQUfQzwBx6yljP9s7LvKSnWak3neSobGE/edit#heading=h.emc0jaqr8xzz
 * Doc : [Fetching, Caching Strategy] https://docs.google.com/document/d/1ehbDnAcAJ9u92VtZhaWNTyVIIg_cwv8A7YTBq3-Avow/edit
 */
export default function Page() {
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery({
    queryKey: ['list'],
    queryFn: function ({pageParam}) {
      return getTestPlainListApi(pageParam);
    },
    initialPageParam: 1
  });

  return (
    <>
      <Link href="/" style={{fontSize: 20, position: 'fixed'}}>다른 페이지 갔다가, gcTime 지나고 돌아오면 리셋됨</Link> {/* 첫 렌더링부터 얘가 보임 ==> Streaming 증거 */}

      {/* Point 1. gcTime을 여기에서도 지정 > https://github.com/TanStack/query/issues/8136#issuecomment-2396908483 */}
      <HydrationBoundary state={dehydrate(queryClient)} options={{defaultOptions: {queries: {gcTime: 1000 * 60 * 10}}}}>
        <ClientListPage/>
      </HydrationBoundary>
    </>
  );
}
