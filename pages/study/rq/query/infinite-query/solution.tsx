import React from 'react';
import {QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import type {QueryFunctionContext} from '@tanstack/query-core/build/lib/types';
import type {Course} from '@type/response-sub/course-sub';
import CourseApi from '@api/CourseApi';
import styled from 'styled-components';
import {flexCenter} from '@util/services/style/css';
import {useInfiniteScroll} from '@util/extend/event/scroll';

// URL: http://localhost:3000/study/rq/query/infinite-query/solution
export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['projects'],
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
  page: number;
  nextPage: number | undefined;
}

/**
 * 문제점1. 매번 queryFn에서 반환한 리스트 데이터를 펼쳐야함.
 * 문제점2. 매번 nextPage 타입 추가하고, getNextPageParam만들어야함.
 * 문제점3. 매번 isFetchingNext 일 때 실행안하도록 구현 추가해야함.
 */
async function queryFn(params: QueryFunctionContext<QueryKey, number>): Promise<PageData> {
  const {pageParam = 1} = params;
  const api = new CourseApi();
  const {data: {list, totalPage}} = await api.getList({page: pageParam});

  return {
    courseList: list,
    page: pageParam,
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