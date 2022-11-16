import {useKeepQuery} from '@util/extend/router';
import {useCallback} from 'react';
import type {UrlObject} from 'url';

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

export interface PaginationConfig {
  pagePerView: number;
  articlePerPage: number;
}

export interface PaginationParam {
  currentPage: number;
  total: number;
  config: PaginationConfig;
}

export interface MovablePageData {
  page: number;
  movable: boolean;
}

const DEFAULT_MOVABLE_PAGE_DATA: MovablePageData = {
  page: 1,
  movable: false
};

export const DEFAULT_CORE_PAGINATION: CorePagination = {
  totalPage: 0,
  isExistPage: false,
  last: DEFAULT_MOVABLE_PAGE_DATA,
  first: DEFAULT_MOVABLE_PAGE_DATA,
  next: DEFAULT_MOVABLE_PAGE_DATA,
  previous: DEFAULT_MOVABLE_PAGE_DATA
};

export function getMovablePageData(enable: boolean, enablePage: number): MovablePageData {
  if (!enable) {
    return DEFAULT_MOVABLE_PAGE_DATA;
  }

  return {
    movable: true,
    page: enablePage
  };
}

export interface CorePagination {
  isExistPage: boolean;
  totalPage: number;
  next: MovablePageData;
  previous: MovablePageData;
  first: MovablePageData;
  last: MovablePageData;
}

export interface UsePaginationOption {
  pageToHref: (page: number) => string | UrlObject;
}

export interface MovePageData extends MovablePageData {
  href: ReturnType<UsePaginationOption['pageToHref']>;
}

export interface UseCorePagingResult {
  isExistPage: boolean;
  totalPage: number;
  pageToHrefWithDefault: UsePaginationOption['pageToHref'];
  first: MovePageData;
  previous: MovePageData;
  next: MovePageData;
  last: MovePageData;
}

export function useCorePagination<T extends CorePagination>(corePagination: CorePagination, param: PaginationParam, option?: Partial<UsePaginationOption>): UseCorePagingResult {
  const {next, last, first, previous, isExistPage, totalPage} = corePagination;

  const {keepQueryUrlObject} = useKeepQuery();

  const pageToHrefWithDefault = useCallback((page: number) => {
    if (option?.pageToHref) {
      return option.pageToHref(page);
    }

    return keepQueryUrlObject({page});
  }, [option, keepQueryUrlObject]);

  const getMovePageData = useCallback(({page, movable}: MovablePageData) => {
    return {
      page,
      movable,
      href: !movable ? pageToHrefWithDefault(param.currentPage) : pageToHrefWithDefault(page)
    };
  }, [pageToHrefWithDefault, param.currentPage]);

  return {
    isExistPage,
    totalPage,
    pageToHrefWithDefault,
    first: getMovePageData(first),
    previous: getMovePageData(previous),
    next: getMovePageData(next),
    last: getMovePageData(last)
  };
}
