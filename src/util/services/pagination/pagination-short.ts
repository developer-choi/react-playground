import type {
  CorePagination,
  CorePaginationParam,
  MoveBothSidePagination,
  MoveOnePagination
} from '@util/services/pagination/pagination-core';
import {
  DEFAULT_MOVE_BOTH_SIDE_PAGINATION,
  DEFAULT_CORE_PAGINATION,
  DEFAULT_MOVE_ONE_PAGINATION,
  getTotalPage, makePaginationLink
} from '@util/services/pagination/pagination-core';

export type ShortPagination = CorePagination & MoveOnePagination & MoveBothSidePagination;

export function getShortPagination({total, config, currentPage, pageToHref}: CorePaginationParam): ShortPagination {
  if (total <= 0) {
    return {
      ...DEFAULT_CORE_PAGINATION,
      ...DEFAULT_MOVE_ONE_PAGINATION,
      ...DEFAULT_MOVE_BOTH_SIDE_PAGINATION
    };
  }

  const {totalPage, isExistPage} = getTotalPage({total, articlePerPage: config.articlePerPage});

  const canFirst = currentPage > 1;
  const canPrevious = currentPage > 1;
  const canNext = currentPage < totalPage;
  const canLast = currentPage < totalPage;

  const first = makePaginationLink(canFirst, 1, pageToHref);
  const previous = makePaginationLink(canPrevious, currentPage - 1, pageToHref);
  const next = makePaginationLink(canNext, currentPage + 1, pageToHref);
  const last = makePaginationLink(canLast, totalPage, pageToHref);

  return {
    totalPage,
    isExistPage,
    first,
    previous,
    next,
    last
  };
}
