import {range} from '@forworkchoe/core';
import {PageElement} from '@/utils/extend/pagination';

export interface BasicPaginationParam {
  currentPage: number;
  config: {
    totalPage: number;
    size: number;
  };
}

export interface BasicPagination {
  elements: PageElement[];
  next: PageElement;
  previous: PageElement;
  first: PageElement;
  last: PageElement;
}

export function getBasicPagination(param: BasicPaginationParam): BasicPagination {
  const {currentPage, config: {totalPage, size}} = param;

  const startPage = Math.floor(((currentPage - 1) / size)) * size + 1;
  const tempEndPage = startPage + size - 1;
  const endPage = tempEndPage > totalPage ? totalPage : tempEndPage;

  const pageMap = {
    first: 1,
    previous: startPage - size,
    next: startPage + size,
    last: totalPage
  };

  const first: PageElement = {
    page: pageMap.first,
    state: currentPage > pageMap.first ? 'default' : 'disabled',
  };

  const previous: PageElement = {
    page: pageMap.previous,
    state: pageMap.previous > 0 ? 'default' : 'disabled',
  };

  const next: PageElement = {
    page: pageMap.next,
    state: pageMap.next > totalPage ? 'disabled' : 'default',
  };

  const last: PageElement = {
    page: pageMap.last,
    state: next.state,
  };

  [first, previous, next, last].forEach(element => {
    if (element.state === 'disabled') {
      element.page = currentPage;
    }
  });

  const elements = range(startPage, endPage).map(page => {
    const element: PageElement = {
      state: currentPage === page ? 'active' : 'default',
      page
    };

    return element;
  });

  return {
    elements: elements,
    first,
    previous,
    next,
    last
  };
}
