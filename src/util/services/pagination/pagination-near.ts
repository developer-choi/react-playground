import type {BasicPagination} from '@util/services/pagination/pagination-basic';
import type {MultiplePagesPaginationParam} from '@util/services/pagination/pagination-core';
import {
  DEFAULT_MOVE_BOTH_SIDE_PAGINATION,
  DEFAULT_MULTIPLE_PAGINATION,
  DEFAULT_MOVE_ONE_PAGINATION,
  getTotalPage,
  makePaginationLink
} from '@util/services/pagination/pagination-core';
import {range} from '@util/extend/number';

//홀수
function getOddNearStartPage({currentPage, pagePerView}: {currentPage: number, pagePerView: number}) {
  const naturalHalf = Math.floor(pagePerView / 2);
  return (naturalHalf + 1) < currentPage ? currentPage - naturalHalf : 1;
}

//짝수
function getEvenNearStartPage({currentPage, pagePerView}: {currentPage: number, pagePerView: number}) {
  const naturalHalf = pagePerView / 2;
  return naturalHalf < currentPage ? currentPage - naturalHalf : 1;
}

export function getNearPagination({currentPage, total, config: {pagePerView, articlePerPage}, pageToHref}: MultiplePagesPaginationParam): BasicPagination {
  if (total <= 0) {
    return {
      ...DEFAULT_MULTIPLE_PAGINATION,
      ...DEFAULT_MOVE_BOTH_SIDE_PAGINATION,
      ...DEFAULT_MOVE_ONE_PAGINATION
    };
  }

  const {totalPage, isExistPage} = getTotalPage({total, articlePerPage});

  const startPage = pagePerView % 2 === 0 ?
    getEvenNearStartPage({
      currentPage,
      pagePerView
    })
    :
    getOddNearStartPage({
      currentPage,
      pagePerView
    });

  const tempEndPage = startPage + pagePerView - 1;
  const endPage = tempEndPage > totalPage ? totalPage : tempEndPage;

  const pages = range(startPage, endPage);
  const betweenLinkList = pages.map(page => ({page, href: pageToHref(page)}));

  const next = makePaginationLink(currentPage < totalPage, currentPage + 1, pageToHref);
  const previous = makePaginationLink(currentPage !== 1, currentPage - 1, pageToHref);
  const first = makePaginationLink(currentPage > 1, 1, pageToHref);
  const last = makePaginationLink(currentPage < totalPage, totalPage, pageToHref);

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
