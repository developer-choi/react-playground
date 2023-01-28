import type {
  CorePagination,
  CorePaginationParam,
  MoveBothSidePagination,
  MoveOnePagination
} from '@util/services/pagination/pagination-core';
import {getTotalPage, makePageElementData} from '@util/services/pagination/pagination-core';

export type ShortPagination = CorePagination & MoveOnePagination & MoveBothSidePagination;

export function getShortPagination({total, config: {articlePerPage}, currentPage}: CorePaginationParam): ShortPagination | null {
  if (total <= 0) {
    return null;
  }

  const totalPage = getTotalPage({total, articlePerPage});

  const first = makePageElementData({
    disable: currentPage <= 1,
    page: 1,
    currentPage: currentPage
  });

  const previous = makePageElementData({
    disable: first.disable as boolean,
    page: currentPage - 1,
    currentPage
  });

  const next = makePageElementData({
    disable: currentPage >= totalPage,
    page: currentPage + 1,
    currentPage
  });

  const last = makePageElementData({
    disable: next.disable as boolean,
    page: totalPage,
    currentPage
  });

  return {
    totalPage,
    first,
    previous,
    next,
    last
  };
}
