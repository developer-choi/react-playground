import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useScrollRestoration} from '@util/extend/scroll-restoration';
import {QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import {EMPTY_ARRAY} from '@util/extend/data-type/array';
import Link from 'next/link';
import {SCROLL_RESTORATION_HREFS} from '@component/others/scroll-restoration';
import type {Course} from '@type/response-sub/course-sub';
import type {QueryFunctionContext} from '@tanstack/query-core/build/lib/types';
import CourseApi from '@api/CourseApi';
import styled from 'styled-components';

/**
 * 목적지 갔다가 뒤로가기했을 때 스크롤복원이 안됨.
 * 원인은, 뒤로가기해서 왔을 때 start state가 0이어서 캐싱된 데이터가 있다 하더라도 0번부터 잘려서 나오기때문...
 */

/**
 * LOCAL URL: http://localhost:3000/study/next/scroll-restoration/my-solution/infinite-scroll-with-insta
 * BLOG URL: https://mygumi.tistory.com/376
 */
export default function Page() {
  useScrollRestoration();

  const [start, setStart] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['scroll-restoration/infinite-scroll-with-instagram'],
    queryFn,
    getNextPageParam,
    refetchOnWindowFocus: false
  });

  const items = data?.pages.map(({courseList}) => courseList).flat() ?? EMPTY_ARRAY;

  const slicedItems = useMemo(() => {
    const s = Math.floor(start) - ROW_COUNT / 2 < 0 ? 0 : Math.floor(start) - ROW_COUNT / 2;
    const e = s + ROW_COUNT;
    return items.slice(s, e);
  }, [start, items]);

  useEffect(() => {
    lastRow = items.length - 1;
  }, [items]);

  const updatePaddingTop = useCallback((currentStart: number) => {
    // 현재 스크린에 있는 아이템의 번호가 10번이라면, 1~9번에 차지하는 높이를 그대로 paddingTop 으로 사용.
    const start =
      Math.floor(currentStart) - ROW_COUNT / 2 < 0
        ? 0
        : Math.floor(currentStart) - ROW_COUNT / 2;
    setPaddingTop(start * ROW_HEIGHT);
  }, []);

  const updatePaddingBottom = useCallback((currentStart: number) => {
    const s =
      Math.floor(currentStart) - ROW_COUNT / 2 < 0
        ? 0
        : Math.floor(currentStart) - ROW_COUNT / 2;
    let currentViewLastRow = s + ROW_COUNT;

    // 현재 마지막 번호가 노출되는 최대 번호보다 같거나 작으면 paddingBottom 이 필요없음.
    // 현재까지 받아온 마지막 row 번호 - 현재 노출되어 있는 마지막 row 번호
    if (lastRow <= currentViewLastRow) {
      currentViewLastRow = 0;
    } else {
      currentViewLastRow = lastRow - currentViewLastRow;
    }
    setPaddingBottom(currentViewLastRow * ROW_HEIGHT);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const {clientHeight, scrollTop, scrollHeight} = document.documentElement;
      const currentStart = Math.floor(scrollTop / ROW_HEIGHT);

      updatePaddingTop(currentStart);
      updatePaddingBottom(currentStart);
      setStart(currentStart);

      if (!hasNextPage || isFetching) {
        return;
      }

      if (clientHeight + scrollTop >= scrollHeight) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetching, updatePaddingBottom, updatePaddingTop]);

  return (
    <div
      className="App"
      style={{paddingTop: paddingTop + 'px', paddingBottom: paddingBottom + 'px'}}
    >
      {slicedItems.map(({pk, title}) => (
        <Link href={SCROLL_RESTORATION_HREFS.mySolution} key={pk} passHref>
          <Row>
            <h1>{title}</h1>
          </Row>
        </Link>
      ))}
    </div>
  );
}

const ROW_COUNT = 20; // /course/list articlePerPage 기본값 20임
const ROW_HEIGHT = 350; // 밑에 Row 스타일에 height 330에 margin-bottom 20 합쳐서 350
let lastRow = 20; // /course/list articlePerPage 기본값 20임

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

const Row = styled.a`
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  background: #eee;
  font-size: 26px;
`;
