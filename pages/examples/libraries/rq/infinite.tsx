import React, {Fragment} from 'react';
import {QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import type {QueryFunctionContext} from '@tanstack/query-core/build/lib/types';

export default function Page() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn,
    getNextPageParam,
    initialData: {
      pages: [
        {projects: [{id: 1, name: 'initial-1-project'}], nextPage: 2},
        {projects: [{id: 2, name: 'initial-2-project'}], nextPage: 3},
      ],
      pageParams: [1, 2]
    }
  });

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {(error as Error).message}</p>
  ) : (
    <>
      {data.pages.map((pageData, i) => (
        <Fragment key={i}>
          {pageData.projects.map(project => (
            <p key={project.id}>{project.name}</p>
          ))}
        </Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
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
  const {pageParam = 2} = params;

  console.log('queryFn', params);

  return {
    projects: [
      {id: pageParam, name: `${pageParam}-project`}
    ] as Project[],
    nextPage: pageParam >= LAST_PAGE ? undefined : pageParam + 1,
  };
}

function getNextPageParam(pageData: PageData, allPageData: PageData[]): number | undefined {
  return pageData.nextPage;
}

// const queryFn: QueryFunction<PageData> = async ({pageParam = 2}) => {
//   return {
//     projects: [
//       {id: pageParam, name: `${pageParam}-project`}
//     ] as Project[],
//     nextPage: pageParam >= LAST_PAGE ? undefined : pageParam + 1,
//   };
// };
//
// const getNextPageParam: GetNextPageParamFunction<PageData> = (lastPage) => {
//   return lastPage.nextPage;
// };
