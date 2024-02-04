import React, {UIEvent, useCallback} from 'react';
import {QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import List from 'rc-virtual-list';
import type {Course} from '@type/response-sub/course-sub';
import type {QueryFunctionContext} from '@tanstack/query-core/build/lib/types';
import styled from 'styled-components';
import {flexCenter} from '@util/services/style/css';
import {useInfiniteScroll} from '@util/extend/event/scroll';
import {getCourseListApi} from '@api/course-api';

// URL: http://localhost:3000/study/other-libraries/rc-virtual-list/limitation
export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['rc-virtual-list-limitation'],
    queryFn,
    getNextPageParam,
    refetchOnWindowFocus: false
  });

  if (!data) {
    return null;
  }

  const list = data.pages.map(({courseList}) => courseList).flat();
  const enabled = !!hasNextPage && !isFetching;

  return (
    <Problem list={list} enabled={enabled} fetchNextPage={fetchNextPage}/>
    // <Solution list={list} enabled={enabled} fetchNextPage={fetchNextPage}/>
  );
}

/**
 * rc-virtual-list 문제점
 * 1. 커스텀 스크롤바를 사용했기 때문에, 스크롤복원관련 아무런 동작을 못시킴.
 * 2. 반드시 height를 지정해줘야했음. 이거 지정안해주면 virtual list 동작을 안함.
 * ㄴ 이 height는 container의 view port상에 보이는 높이인거같은데,
 * ㄴ 상품리스트 필터 처럼 컨테이너 높이가 고정되는 경우에는 딱 쓸수있는데
 * ㄴ 상품리스트 처럼 뷰포트만큼 늘어나는경우 높이를 고정시킬 수 없음.
 *
 * 개발자도구 Element탭 보면, 스크롤내리는족족 element 쭉쭉쌓임. virtual하게 작동하지않음.
 */
function Problem({list, enabled, fetchNextPage}: {list: Course[], enabled: boolean, fetchNextPage: any}) {
  useInfiniteScroll({
    callback: fetchNextPage,
    enabled
  });

  return (
    <List data={list} itemHeight={200} itemKey="pk">
      {({title}) => (
        <Row>{title}</Row>
      )}
    </List>
  );
}

/** height를 줘밨으나 생긴 문제점
 * 위에 height를 지정해야한다는 문제점을 해결하기위해,
 * 1개 페이지 (20개의 항목) 만큼 데이터를 노출했을 때 차지하는 높이값을 계산해서 container height를 지정하고 (스크롤 생길만큼)
 * 진행해본결과, virtual하게 작동한다는것은 달성했으나 여전히 문제가 발생함.
 *
 * 1. body의 스크롤바가 보기 흉해서 숨기긴해야됨. body의 스크롤바가 안움직임.
 * 2. 여전히 스크롤복원 안됨.
 */
function Solution({list, enabled, fetchNextPage}: {list: Course[], enabled: boolean, fetchNextPage: any}) {
  //200 곱하기 1페이지(20개) + margin-bottom 20px x 19개 = 4360
  const height = 4360;

  const onScroll = useCallback((event: UIEvent<HTMLElement>) => {
    if (!enabled) {
      return;
    }

    const {scrollHeight, clientHeight, scrollTop} = event.target as HTMLElement;

    if ((scrollHeight - clientHeight - scrollTop) <= 500) {
      fetchNextPage();
    }
  }, [enabled, fetchNextPage]);

  return (
    <List data={list} itemHeight={200} height={height} itemKey="pk" onScroll={onScroll}>
      {({title}) => (
        <Row>{title}</Row>
      )}
    </List>
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

const Row = styled.div`
  border: 5px solid blue;
  height: 200px;
  ${flexCenter};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;
