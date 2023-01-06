import {range} from '@util/extend/data-type/number';
import type {
  MoveBothSidePagination,
  MoveOnePagination,
  MultiplePagesPagination,
  MultiplePagesPaginationParam,
} from './pagination-core';
import {
  DEFAULT_MOVE_BOTH_SIDE_PAGINATION,
  DEFAULT_MULTIPLE_PAGINATION,
  getTotalPage,
  makePaginationLink,
  DEFAULT_MOVE_ONE_PAGINATION
} from './pagination-core';

export type BasicPagination = MultiplePagesPagination & MoveOnePagination & MoveBothSidePagination;

export function getBasicPagination({currentPage, config: {pagePerView, articlePerPage}, total, pageToHref}: MultiplePagesPaginationParam): BasicPagination {
  if (total <= 0) {
    return {
      ...DEFAULT_MOVE_ONE_PAGINATION,
      ...DEFAULT_MOVE_BOTH_SIDE_PAGINATION,
      ...DEFAULT_MULTIPLE_PAGINATION
    };
  }

  const {totalPage, isExistPage} = getTotalPage({total, articlePerPage});
  const startPage = Math.floor(((currentPage - 1) / pagePerView)) * pagePerView + 1;
  const tempEndPage = startPage + pagePerView - 1;
  const endPage = tempEndPage > totalPage ? totalPage : tempEndPage;

  const pages = range(startPage, endPage);
  const betweenLinkList = pages.map(page => ({page, href: pageToHref(page)}));

  const canFirst = currentPage > 1;
  const canLast = currentPage < totalPage;
  const canNext = endPage < totalPage;
  const canPrevious = startPage !== 1;

  const next = makePaginationLink(canNext, startPage + pagePerView, pageToHref);
  const previous = makePaginationLink(canPrevious, startPage - pagePerView, pageToHref);
  const first = makePaginationLink(canFirst, 1, pageToHref);
  const last = makePaginationLink(canLast, totalPage, pageToHref);

  return {
    betweenLinkList,
    isExistPage,
    totalPage,
    first,
    previous,
    next,
    last
  };
}
