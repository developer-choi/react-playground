import {range} from '@util/extend/number';

interface TotalPageParam {
  total: number;
  articlePerPage: number;
}

export function getTotalPage({total, articlePerPage}: TotalPageParam) {
  const dividedValue = Math.floor(total / articlePerPage);

  if (total % articlePerPage === 0) {
    return dividedValue;
  }

  return dividedValue + 1;
}

export interface PaginationParam {
  currentPage: number;
  total: number;
  pagePerView: number;
  articlePerPage: number;
}

export interface MovablePageData {
  page: number;
  movable: boolean;
}

export interface Pagination {
  pages: number[];
  isExistPage: boolean;
  next: MovablePageData;
  previous: MovablePageData;
  first: MovablePageData;
  last: MovablePageData;
}

export function getPagination({currentPage, pagePerView, articlePerPage, total}: PaginationParam): Pagination {
  const defaultPageData: MovablePageData = {
    movable: false,
    page: 1 // 이동할 수 없는 페이지번호를 나타낼 때 현재 페이지번호를 저장하여 페이지이동이 일어나지 않도록 함.
  };

  if(total <= 0) {
    return {
      pages: [],
      isExistPage: false,
      last: defaultPageData,
      next: defaultPageData,
      previous: defaultPageData,
      first: defaultPageData
    };
  }
  const totalPage = getTotalPage({total, articlePerPage});
  const startPage = Math.floor(((currentPage - 1) / pagePerView)) * pagePerView + 1;
  const tempEndPage = startPage + pagePerView - 1;
  const endPage = tempEndPage > totalPage ? totalPage : tempEndPage;

  const pages = range(startPage, endPage);

  const canFirst = currentPage > 1;
  const canLast = currentPage < totalPage;
  const canNext = endPage < totalPage;
  const canPrevious = startPage !== 1;

  const next: MovablePageData = !canNext ? defaultPageData : {
    page: startPage + pagePerView,
    movable: true
  };
  const previous: MovablePageData = !canPrevious ? defaultPageData : {
    page: startPage - pagePerView,
    movable: true
  };
  const first: MovablePageData = !canFirst ? defaultPageData : {
    page: 1,
    movable: true
  };
  const last: MovablePageData = !canLast ? defaultPageData : {
    page: totalPage,
    movable: true
  };

  return {
    pages,
    isExistPage: true,
    first,
    previous,
    next,
    last
  };
}
