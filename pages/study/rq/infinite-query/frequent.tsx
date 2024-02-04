import React from 'react';
import type {QueryFunctionContext} from '@tanstack/query-core/build/lib/types';
import type {QueryKey} from '@tanstack/react-query';
import {useInfiniteQuery} from '@tanstack/react-query';
import Button from '@component/atom/element/Button';
import {timeoutPromise} from '@util/extend/test';

// URL: http://localhost:3000/study/rq/infinite-query/frequent
export default function Page() {
  const {
    data,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['general-example'],
    queryFn,
    getNextPageParam,
    refetchOnWindowFocus: false,
    staleTime: 50000
  });

  const list = data?.pages.map(page => page.projects).flat() ?? [];

  if (status === 'loading') {
    return (
      <p>Loading...</p>
    );
  }

  /**
   * 버튼을 광클하는경우
   * 1. API가 클릭하는만큼 호출됨. ==> useInfiniteQuery에서 queryKey 왜쓰는지 1도 모르겠음. staleTime을 줘도 똑같음.
   * 2. TTFB 1초로 설정했는데, 한 5초내내 계속 광클하고있으면 신기하게 렌더링 5초내내 안됨. 이유는모르겠음.
   * 3. 이게 문제가되는 이유는, Infinite Scroll 방식으로 할 때 스크롤 내려서 스로틀링 걸리는 수십번동안 API 호출됨.
   */
  return (
    <>
      <Button onClick={() => fetchNextPage()}>
        광클해보기
      </Button>
      {list.map((data) => (
        <p key={data.id}>{data.name}</p>
      ))}
    </>
  );
}

const LAST_PAGE = 5;

interface PageData {
  projects: Project[];
  nextPage: number | undefined;
}

interface Project {
  id: number;
  name: string;
}

async function queryFn(params: QueryFunctionContext<QueryKey, number>): Promise<PageData> {
  const {pageParam = 1} = params;

  console.log('Call API', params);

  await timeoutPromise(1000);

  return {
    projects: [
      {id: new Date().getTime(), name: `${pageParam}-project-first`},
      {id: new Date().getTime() + 1, name: `${pageParam}-project-twice`},
    ] as Project[],
    nextPage: pageParam >= LAST_PAGE ? undefined : pageParam + 1,
  };
}

function getNextPageParam(pageData: PageData): number | undefined {
  return pageData.nextPage;
}
