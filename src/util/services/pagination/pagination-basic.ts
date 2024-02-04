import type {
  MoveBothSidePagination,
  MoveOnePagination,
  MultiplePagesPagination,
  MultiplePagesPaginationParam,
} from './pagination-core';
import {getTotalPage, makeMultiplePagesCommonPagination, makeMovePageElementData} from './pagination-core';

export type BasicPagination = MultiplePagesPagination & MoveOnePagination & MoveBothSidePagination;

export function getBasicPagination(param: MultiplePagesPaginationParam): BasicPagination | null {
  const {currentPage, config: {articlePerPage, pagePerView}, total} = param;

  if (total <= 0) {
    return null;
  }

  const totalPage = getTotalPage({total, articlePerPage});
  const startPage = Math.floor(((currentPage - 1) / pagePerView)) * pagePerView + 1;
  const {endPage, betweenPageElementDataList} = makeMultiplePagesCommonPagination({startPage, totalPage, param});

  const first = makeMovePageElementData({
    disable: currentPage === 1,
    page: 1,
    currentPage
  });

  const previous = makeMovePageElementData({
    disable: first.disable as boolean,
    page: startPage - pagePerView,
    currentPage
  });

  const next = makeMovePageElementData({
    disable: endPage === totalPage,
    page: startPage + pagePerView,
    currentPage
  });

  const last = makeMovePageElementData({
    disable: next.disable as boolean,
    page: totalPage,
    currentPage
  });

  return {
    betweenPageElementDataList,
    totalPage,
    first,
    previous,
    next,
    last
  };
}
