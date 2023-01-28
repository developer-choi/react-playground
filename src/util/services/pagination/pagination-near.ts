import type {BasicPagination} from '@util/services/pagination/pagination-basic';
import type {MultiplePagesPaginationParam} from '@util/services/pagination/pagination-core';
import {
  getTotalPage,
  makeMultiplePagesCommonPagination,
  makeMovePageElementData
} from '@util/services/pagination/pagination-core';

interface NearPageParam {
  currentPage: number;
  pagePerView: number;
  totalPage: number;
}

//홀수
function getOddNearStartPage({currentPage, pagePerView, totalPage}: NearPageParam) {
  const naturalHalf = Math.floor(pagePerView / 2);

  if (currentPage >= (totalPage - naturalHalf)) {
    return totalPage - pagePerView + 1;
  }

  if (currentPage <= (naturalHalf + 1)) {
    return 1;
  }

  return currentPage - naturalHalf;
}

//짝수
function getEvenNearStartPage({currentPage, pagePerView, totalPage}: NearPageParam) {
  const naturalHalf = pagePerView / 2;

  if(currentPage >= (totalPage - naturalHalf)) {
    return totalPage - pagePerView + 1;
  }

  if(currentPage <= naturalHalf) {
    return 1;
  }

  return currentPage - naturalHalf + 1;
}

export function getNearPagination(param: MultiplePagesPaginationParam): BasicPagination | null {
  const {currentPage, total, config: {articlePerPage, pagePerView}} = param;

  if (total <= 0) {
    return null;
  }

  const totalPage = getTotalPage({total, articlePerPage});

  const startPage = pagePerView % 2 === 0 ?
    getEvenNearStartPage({
      currentPage,
      pagePerView,
      totalPage
    })
    :
    getOddNearStartPage({
      currentPage,
      pagePerView,
      totalPage
    });

  const {endPage, betweenPageElementDataList} = makeMultiplePagesCommonPagination({startPage, totalPage, param});

  const first = makeMovePageElementData({
    disable: startPage === 1,
    page: 1,
    currentPage
  });

  const previous = makeMovePageElementData({
    disable: currentPage === 1,
    page: currentPage - 1,
    currentPage
  });

  const next = makeMovePageElementData({
    disable: currentPage === totalPage,
    page: currentPage + 1,
    currentPage
  });

  const last = makeMovePageElementData({
    disable: endPage === totalPage,
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
