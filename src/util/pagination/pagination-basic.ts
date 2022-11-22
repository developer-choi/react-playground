import {range} from '@util/extend/number';
import type {CorePagination, PaginationParam, UseCorePagingResult, UsePaginationOption} from './pagination-core';
import {DEFAULT_CORE_PAGINATION, getMovablePageData, getTotalPage, useCorePagination} from './pagination-core';

export interface BasicPagination extends CorePagination {
  pages: number[];
}

export function getBasicPagination({currentPage, config: {pagePerView, articlePerPage}, total}: PaginationParam): BasicPagination {
  if (total <= 0) {
    return {
      pages: [],
      ...DEFAULT_CORE_PAGINATION
    };
  }

  const {totalPage, isExistPage} = getTotalPage({total, articlePerPage});
  const startPage = Math.floor(((currentPage - 1) / pagePerView)) * pagePerView + 1;
  const tempEndPage = startPage + pagePerView - 1;
  const endPage = tempEndPage > totalPage ? totalPage : tempEndPage;

  const pages = range(startPage, endPage);

  const canFirst = currentPage > 1;
  const canLast = currentPage < totalPage;
  const canNext = endPage < totalPage;
  const canPrevious = startPage !== 1;

  const next = getMovablePageData(canNext, startPage + pagePerView);
  const previous = getMovablePageData(canPrevious, startPage - pagePerView);
  const first = getMovablePageData(canFirst, 1);
  const last = getMovablePageData(canLast, totalPage);

  return {
    pages,
    isExistPage,
    totalPage,
    first,
    previous,
    next,
    last
  };
}

export type UseBasicPagingResult = UseCorePagingResult & Pick<BasicPagination, 'pages'>;

export function useBasicPagination(param: PaginationParam, option?: Partial<UsePaginationOption>): UseBasicPagingResult {
  const basicPagination = getBasicPagination(param);
  const corePaginationResult = useCorePagination(basicPagination, param, option);

  return {
    pages: basicPagination.pages,
    ...corePaginationResult
  };
}
