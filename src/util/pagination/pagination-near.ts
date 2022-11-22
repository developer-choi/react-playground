import type {BasicPagination} from '@util/pagination/pagination-basic';
import type {PaginationParam} from '@util/pagination/pagination-core';
import {DEFAULT_CORE_PAGINATION, getMovablePageData, getTotalPage} from '@util/pagination/pagination-core';
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

export function getNearPagination({currentPage, total, config: {pagePerView, articlePerPage}}: PaginationParam): BasicPagination {
  if (total <= 0) {
    return {
      pages: [],
      ...DEFAULT_CORE_PAGINATION
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

  const next = getMovablePageData(currentPage < totalPage, currentPage + 1);
  const previous = getMovablePageData(currentPage !== 1, currentPage - 1);
  const first = getMovablePageData(currentPage > 1, 1);
  const last = getMovablePageData(currentPage < totalPage, totalPage);

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
