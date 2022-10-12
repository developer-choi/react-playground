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

export interface Pagination {
  pages: number[];
  canNext: boolean;
  canPrevious: boolean;
  canFirst: boolean;
  canLast: boolean;
  nextPage: number;
  previousPage: number;
  firstPage: number;
  lastPage: number;
}

export function getPagination({currentPage, pagePerView, articlePerPage, total}: PaginationParam): Pagination {
  const defaultPage = currentPage; // 이동할 수 없는 페이지번호를 나타낼 때 현재 페이지번호를 저장하여 페이지이동이 일어나지 않도록 함.

  if(total <= 0) {
    return {
      pages: [],
      canFirst: false,
      canPrevious: false,
      canNext: false,
      canLast: false,
      firstPage: defaultPage,
      lastPage: defaultPage,
      previousPage: defaultPage,
      nextPage: defaultPage
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

  const nextPage = !canNext ? defaultPage : startPage + pagePerView;
  const previousPage = !canPrevious ? defaultPage : startPage - pagePerView;
  const firstPage = !canFirst ? defaultPage : 1;
  const lastPage = !canLast ? defaultPage : totalPage;

  return {
    canFirst,
    canPrevious,
    canNext,
    canLast,
    pages,
    nextPage,
    previousPage,
    firstPage,
    lastPage
  };
}
