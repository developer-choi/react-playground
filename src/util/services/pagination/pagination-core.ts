import type {LinkProps} from 'next/link';

/***************************************************
 * Common
 ***************************************************/

type Href = LinkProps['href'];

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
export function makePageElementData(disable: boolean, page: number): PageElementData {
  return {
    disable,
    page,
    active: false
  };
}

//Only between pages
export function makeBetweenPageElementDataList(pages: number[], currentPage: number): PageElementData[] {
  return pages.map(page => ({
    page,
    disable: false,
    active: currentPage === page
  }));
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
  methods: PaginationMethod;
}

export type MultiplePagesPaginationParam = CorePaginationParam<MultiplePagesPaginationConfig>;

export interface MultiplePagesPaginationComponentProps extends MultiplePagesPaginationParam {
  methods: PaginationMethod;
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
