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

  const first = makePageElementData(currentPage <= 1, 1);
  const previous = makePageElementData(currentPage <= 1, currentPage - 1);
  const next = makePageElementData(currentPage >= totalPage, currentPage + 1);
  const last = makePageElementData(currentPage >= totalPage, totalPage);

  return {
    totalPage,
    first,
    previous,
    next,
    last
  };
}
