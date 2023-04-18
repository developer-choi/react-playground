import React from 'react';
import {QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import type {QueryFunctionContext} from '@tanstack/query-core/build/lib/types';
import type {Course} from '@type/response-sub/course-sub';
import styled from 'styled-components';
import {flexCenter} from '@util/services/style/css';
import {useInfiniteScroll} from '@util/extend/event/scroll';
import {getCourseListApi} from '@api/course-api';

// URL: http://localhost:3000/study/rq/query/infinite-query/solution
export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['infinite-scroll-solution'],
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

  const list = data.pages.map(({courseList}) => courseList).flat();

  return (
    <>
      {list.map(({pk, title}) => (
        <Row key={pk}>{title}</Row>
      ))}
    </>
  );
}

interface PageData {
  courseList: Course[];
  // page: number;
  nextPage: number | undefined;
}

/**
 * 문제점1. 매번 queryFn에서 반환한 리스트 데이터를 펼쳐야함.
 * 문제점2. 매번 nextPage 타입 추가하고, getNextPageParam만들어야함.
 * 문제점3. 매번 isFetchingNext 일 때 실행안하도록 구현 추가해야함.
 *
 * 시도1. useNewInfiniteQuery() 이런식으로 useInfinityQuery() 자체를 재정의하려고했음.
 * - 제네릭부터 시작해서 똑같이 따라 쳐야하는 의미없는 코드가 너무많아서 포기했음.
 */
async function queryFn(params: QueryFunctionContext<QueryKey, number>): Promise<PageData> {
  const {pageParam = 1} = params;
  const {list, totalPage} = await getCourseListApi({page: pageParam});

  return {
    courseList: list,
    // page: pageParam,
    nextPage: pageParam >= totalPage ? undefined : pageParam + 1,
  };
}

function getNextPageParam(pageData: PageData): number | undefined {
  return pageData.nextPage;
}

const Row = styled.div`
  border: 5px solid blue;
  height: 200px;
  ${flexCenter};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;