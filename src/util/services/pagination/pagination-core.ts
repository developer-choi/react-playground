import type {LinkProps} from 'next/link';
import {range} from '@util/extend/data-type/number';

/***************************************************
 * Common
 ***************************************************/

export type Href = LinkProps['href'];

interface TotalPageParam {
  total: number;
  articlePerPage: number;
}

export function getTotalPage({total, articlePerPage}: TotalPageParam) {
  const dividedValue = Math.floor(total / articlePerPage);
  return (total % articlePerPage === 0) ? dividedValue : dividedValue + 1;
}

export interface PaginationMethod {
  onClickPage?: (page: number) => void;
  pageToHref?: (page: number) => Href;
}

export interface PageElementData {
  disable?: boolean; //Only first, previous, next, last
  active?: boolean; //Only between pages
  page: number;
}

//Only first, previous, next, last
export function makePageElementData({currentPage, page, disable}: {disable: boolean, page: number, currentPage: number}): PageElementData {
  return {
    page: disable ? currentPage : page,
    disable,
    active: false
  };
}

export function makeMultiplePagesCommonPagination({startPage, totalPage, param}: {startPage: number, totalPage: number, param: MultiplePagesPaginationParam}) {
  const {currentPage, config: {pagePerView}} = param;

  const tempEndPage = startPage + pagePerView - 1;
  const endPage = tempEndPage > totalPage ? totalPage : tempEndPage;

  const pages = range(startPage, endPage);

  const betweenPageElementDataList = pages.map(page => {
    const active = currentPage === page;

    return {
      page: active ? currentPage : page,
      disable: false,
      active
    };
  });

  return {
    betweenPageElementDataList,
    endPage
  };
}

/***************************************************
 * Configs
***************************************************/

export interface CorePaginationConfig {
  articlePerPage: number;
}

export interface MultiplePagesPaginationConfig extends CorePaginationConfig {
  pagePerView: number;
}

/***************************************************
 * Params
 ***************************************************/

export interface CorePaginationParam<T extends CorePaginationConfig = CorePaginationConfig> {
  currentPage: number;
  total: number;
  config: T;
}

export interface CorePaginationComponentProps extends CorePaginationParam {
  methods?: PaginationMethod;
}

export type MultiplePagesPaginationParam = CorePaginationParam<MultiplePagesPaginationConfig>;

export interface MultiplePagesPaginationComponentProps extends MultiplePagesPaginationParam {
  methods?: PaginationMethod;
}

/***************************************************
 * Paginations
 ***************************************************/

export interface MoveOnePagination {
  next: PageElementData;
  previous: PageElementData;
}

export interface MoveBothSidePagination {
  first: PageElementData;
  last: PageElementData;
}

export interface CorePagination {
  totalPage: number;
}

export interface MultiplePagesPagination extends CorePagination {
  betweenPageElementDataList: PageElementData[];
}
