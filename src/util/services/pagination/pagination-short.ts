import type {
  CorePagination,
  CorePaginationParam,
  MoveBothSidePagination,
  MoveOnePagination
} from '@util/services/pagination/pagination-core';
import {getTotalPage, makeMovePageElementData} from '@util/services/pagination/pagination-core';

export type ShortPagination = CorePagination & MoveOnePagination & MoveBothSidePagination;

export function getShortPagination({total, config: {articlePerPage}, currentPage}: CorePaginationParam): ShortPagination | null {
  if (total <= 0) {
    return null;
  }

  const totalPage = getTotalPage({total, articlePerPage});

  const first = makeMovePageElementData({
    disable: currentPage <= 1,
    page: 1,
    currentPage: currentPage
  });

  const previous = makeMovePageElementData({
    disable: first.disable as boolean,
    page: currentPage - 1,
    currentPage
  });

  const next = makeMovePageElementData({
    disable: currentPage >= totalPage,
    page: currentPage + 1,
    currentPage
  });

  const last = makeMovePageElementData({
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
