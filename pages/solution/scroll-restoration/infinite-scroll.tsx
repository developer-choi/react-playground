import React from 'react';
import {useScrollRestoration} from '@util/extend/scroll-restoration';
import {QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import {useInfiniteScroll} from '@util/extend/event/scroll';
import type {Course} from '@type/response-sub/course-sub';
import type {QueryFunctionContext} from '@tanstack/query-core/build/lib/types';
import {
  SCROLL_RESTORATION_HREFS,
  ScrollRestorationLinkList,
  ScrollRestorationLinkType
} from '@component/others/scroll-restoration';
import {getCourseListApi} from '@api/course-api';

/** Flow
 * 기존 csr-rq에서 되는거 다되고,
 * 스크롤 내려서 데이터 더 불러온 다음에 목적지갔다가 되돌아왔을 때 더불러왔던 데이터 그대로 다 남아있음.
 */

// URL: http://localhost:3000/solution/scroll-restoration/infinite-scroll
export default function Page() {
  useScrollRestoration();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['my-solution/infinite-scroll'],
    queryFn,
    getNextPageParam,
    refetchOnWindowFocus: false
  });

  const disabledNextPage = !hasNextPage || isFetching;

  useInfiniteScroll({
    callback: fetchNextPage,
    enabled: !disabledNextPage
  });

  if (!data) {
    return null;
  }

  const list = data.pages.map(({courseList}) => courseList).flat().map<ScrollRestorationLinkType>(({pk, title}) => ({
    key: pk,
    name: title,
    href: SCROLL_RESTORATION_HREFS.mySolution
  }));

  return (
    <ScrollRestorationLinkList list={list}/>
  );
}

interface PageData {
  courseList: Course[];
  page: number;
  nextPage: number | undefined;
}

async function queryFn(params: QueryFunctionContext<QueryKey, number>): Promise<PageData> {
  const {pageParam = 1} = params;
  const {list, totalPage} = await getCourseListApi({page: pageParam});

  return {
    courseList: list,
    page: pageParam,
    nextPage: pageParam >= totalPage ? undefined : pageParam + 1,
  };
}

function getNextPageParam(pageData: PageData): number | undefined {
  return pageData.nextPage;
}
