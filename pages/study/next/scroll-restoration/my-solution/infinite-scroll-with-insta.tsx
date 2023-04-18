import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useScrollRestoration} from '@util/extend/scroll-restoration';
import {QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import {EMPTY_ARRAY} from '@util/extend/data-type/array';
import Link from 'next/link';
import {SCROLL_RESTORATION_HREFS} from '@component/others/scroll-restoration';
import type {Course} from '@type/response-sub/course-sub';
import type {QueryFunctionContext} from '@tanstack/query-core/build/lib/types';
import styled from 'styled-components';
import {getCourseListApi} from '@api/course-api';

/** Flow
 * 1. 스크롤내려도 virtual기능 잘 작동하고,
 * 2. 갔다가 되돌아와도 스크롤복원 잘 됨.
 * 3. 하지만 갔다가 되돌아왔을 때 최초로딩시점에 렌더링해야하는게 너무많은게 단점. (최초에는 모든목록 싹다그려서 늘려놓고 계산되면 그재서야 위아래 다 짜르니까.)
 */

/**
 * LOCAL URL: http://localhost:3000/study/next/scroll-restoration/my-solution/infinite-scroll-with-insta
 * BLOG URL: https://mygumi.tistory.com/376
 */
export default function Page() {
  useScrollRestoration();

  const [magic, setMagic] = useState<Magic>();

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
    if (!magic) {
      return items;
    }

    const {start} = magic;
    
    const s = Math.floor(start) - ROW_COUNT / 2 < 0 ? 0 : Math.floor(start) - ROW_COUNT / 2;
    const e = s + ROW_COUNT;
    return items.slice(s, e);
  }, [magic, items]);

  useEffect(() => {
    lastRow = items.length - 1;
  }, [items]);

  const updateIndex = useCallback(() => {
    const {scrollTop} = document.documentElement;
    const currentStart = Math.floor(scrollTop / ROW_HEIGHT);

    // 현재 스크린에 있는 아이템의 번호가 10번이라면, 1~9번에 차지하는 높이를 그대로 paddingTop 으로 사용.
    const tempStart =
      Math.floor(currentStart) - ROW_COUNT / 2 < 0
        ? 0
        : Math.floor(currentStart) - ROW_COUNT / 2;

    const paddingTop = tempStart * ROW_HEIGHT;

    let currentViewLastRow = tempStart + ROW_COUNT;

    // 현재 마지막 번호가 노출되는 최대 번호보다 같거나 작으면 paddingBottom 이 필요없음.
    // 현재까지 받아온 마지막 row 번호 - 현재 노출되어 있는 마지막 row 번호
    if (lastRow <= currentViewLastRow) {
      currentViewLastRow = 0;
    } else {
      currentViewLastRow = lastRow - currentViewLastRow;
    }
    const paddingBottom = currentViewLastRow * ROW_HEIGHT;

    setMagic({
      start: currentStart,
      paddingTop,
      paddingBottom
    });
  }, []);

  useEffect(() => {
    updateIndex();
  }, [updateIndex]);

  useEffect(() => {
    const onScroll = () => {
      const {clientHeight, scrollTop, scrollHeight} = document.documentElement;
      updateIndex();

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
  }, [fetchNextPage, hasNextPage, isFetching, updateIndex]);

  return (
    <div
      className="App"
      style={{paddingTop: magic?.paddingTop, paddingBottom: magic?.paddingBottom}}
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

interface Magic {
  start: number;
  paddingTop: number;
  paddingBottom: number;
}

const ROW_COUNT = 20; // /course/list articlePerPage 기본값 20임
const ROW_HEIGHT = 350; // 밑에 Row 스타일에 height 330에 margin-bottom 20 합쳐서 350
let lastRow = 20; // /course/list articlePerPage 기본값 20임

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

const Row = styled.a`
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  background: #eee;
  font-size: 26px;
`;
