import type {LinkProps} from 'next/link';

export type Href = LinkProps['href'];

export interface TotalPageParam {
  total: number;
  articlePerPage: number;
}

export function getTotalPage({total, articlePerPage}: TotalPageParam) {
  const dividedValue = Math.floor(total / articlePerPage);
  const totalPage = (total % articlePerPage === 0) ? dividedValue : dividedValue + 1;

  return {
    totalPage,
    isExistPage: totalPage > 0
  };
}

/***************************************************
 * Common
 ***************************************************/

export interface PaginationLink {
  movable: boolean;
  page: number;
  href: Href;
}

export function makePaginationLink(movable: boolean, page: number, pageToHref: CorePaginationParam<any>['pageToHref']) {
  return {
    movable,
    page,
    href: pageToHref(page),
  };
}

/***************************************************
 * Default
 ***************************************************/

export const DEFAULT_PAGINATION_LINK: PaginationLink = {
  href: "",
  page: 1,
  movable: false
};

export const DEFAULT_MOVE_ONE_PAGINATION: MoveOnePagination = {
  next: DEFAULT_PAGINATION_LINK,
  previous: DEFAULT_PAGINATION_LINK
};

export const DEFAULT_MOVE_BOTH_SIDE_PAGINATION: MoveBothSidePagination = {
  first: DEFAULT_PAGINATION_LINK,
  last: DEFAULT_PAGINATION_LINK
};

export const DEFAULT_CORE_PAGINATION: CorePagination = {
  totalPage: 0,
  isExistPage: false
};

export const DEFAULT_MULTIPLE_PAGINATION: MultiplePagesPagination = {
  ...DEFAULT_CORE_PAGINATION,
  betweenLinkList: []
};

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
  pageToHref: (page: number) => Href;
}

export type MultiplePagesPaginationParam = CorePaginationParam<MultiplePagesPaginationConfig>;

/***************************************************
 * Paginations
 ***************************************************/

export interface MoveOnePagination {
  next: PaginationLink;
  previous: PaginationLink;
}

export interface MoveBothSidePagination {
  first: PaginationLink;
  last: PaginationLink;
}

export interface CorePagination {
  isExistPage: boolean;
  totalPage: number;
}

export interface MultiplePagesPagination extends CorePagination {
  betweenLinkList: {
    page: number;
    href: Href;
  }[];
}
