import {range} from '@util/extend/data-type/number';
import type {
  MoveBothSidePagination,
  MoveOnePagination,
  MultiplePagesPagination,
  MultiplePagesPaginationParam,
} from './pagination-core';
import {
  getTotalPage,
  makePageElementData,
  makeBetweenPageElementDataList
} from './pagination-core';

export type BasicPagination = MultiplePagesPagination & MoveOnePagination & MoveBothSidePagination;

export function getBasicPagination({currentPage, config: {pagePerView, articlePerPage}, total}: MultiplePagesPaginationParam): BasicPagination | null {
  if (total <= 0) {
    return null;
  }

  const totalPage = getTotalPage({total, articlePerPage});
  const startPage = Math.floor(((currentPage - 1) / pagePerView)) * pagePerView + 1;
  const tempEndPage = startPage + pagePerView - 1;
  const endPage = tempEndPage > totalPage ? totalPage : tempEndPage;

  const pages = range(startPage, endPage);
  const betweenPageElementList = makeBetweenPageElementDataList(pages, currentPage);

  const first = makePageElementData(currentPage === 1, 1);
  const previous = makePageElementData(currentPage === 1, startPage - pagePerView);
  const next = makePageElementData(endPage === totalPage, startPage + pagePerView);
  const last = makePageElementData(endPage === totalPage, totalPage);

  return {
    betweenPageElementDataList: betweenPageElementList,
    totalPage,
    first,
    previous,
    next,
    last
  };
}
