import type {BasicPagination} from '@util/services/pagination/pagination-basic';
import type {MultiplePagesPaginationParam} from '@util/services/pagination/pagination-core';
import {
  getTotalPage,
  makeBetweenPageElementDataList,
  makePageElementData
} from '@util/services/pagination/pagination-core';
import {range} from '@util/extend/data-type/number';

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

export function getNearPagination({currentPage, total, config: {pagePerView, articlePerPage}}: MultiplePagesPaginationParam): BasicPagination | null {
  if (total <= 0) {
    return null;
  }

  const totalPage = getTotalPage({total, articlePerPage});

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
  const betweenPageElementDataList = makeBetweenPageElementDataList(pages, currentPage);

  const first = makePageElementData(startPage === 1, 1);
  const previous = makePageElementData(currentPage === 1, currentPage - 1);
  const next = makePageElementData(currentPage === totalPage, currentPage + 1);
  const last = makePageElementData(endPage === totalPage, totalPage);

  return {
    betweenPageElementDataList,
    totalPage,
    first,
    previous,
    next,
    last
  };
}
