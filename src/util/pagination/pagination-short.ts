import type {CorePagination, PaginationParam} from '@util/pagination/pagination-core';
import {DEFAULT_CORE_PAGINATION, getMovablePageData, getTotalPage} from '@util/pagination/pagination-core';

export function getShortPagination({total, config, currentPage}: PaginationParam): CorePagination {
  if (total <= 0) {
    return DEFAULT_CORE_PAGINATION;
  }

  const {totalPage, isExistPage} = getTotalPage({total, articlePerPage: config.articlePerPage});

  const canFirst = currentPage > 1;
  const canPrevious = currentPage > 1;
  const canNext = currentPage < totalPage;
  const canLast = currentPage < totalPage;

  const first = getMovablePageData(canFirst, 1);
  const previous = getMovablePageData(canPrevious, currentPage - 1);
  const next = getMovablePageData(canNext, currentPage + 1);
  const last = getMovablePageData(canLast, totalPage);

  return {
    totalPage,
    isExistPage,
    first,
    previous,
    next,
    last
  };
}
