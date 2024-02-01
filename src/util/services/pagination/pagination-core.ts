import type {LinkProps} from "next/link";
import {range} from "@util/extend/data-type/number";

/***************************************************
 * Common
 ***************************************************/

export type Href = LinkProps["href"];

interface TotalPageParam {
  total: number;
  articlePerPage: number;
}

export function getTotalPage({total, articlePerPage}: TotalPageParam) {
  const dividedValue = Math.floor(total / articlePerPage);
  return total % articlePerPage === 0 ? dividedValue : dividedValue + 1;
}

export type PaginationMethod =
  | "defaultPageToHref"
  | {
      pageToHref: (page: number) => Href;
    }
  | {
      onClickPage: (page: number) => void;
    };

export interface PageElementData {
  disable: boolean; //first, previous, next, last에서만 사용하고, 이동할 수 없는 페이지를 나타냄.
  active: boolean; //between pages에서만 사용하고, 현재 페이지임을 나타냄
  prevent: boolean; //(disable || active)로 계산되며, 눌렀을 때 페이지이동을 시킬지 말지 판단하는 데이터
  page: number;
}

//Only first, previous, next, last
export function makeMovePageElementData({currentPage, page, disable}: {disable: boolean; page: number; currentPage: number}): PageElementData {
  const active = false;

  return {
    page: disable ? currentPage : page,
    disable,
    active,
    prevent: disable || active
  };
}

export function makeMultiplePagesCommonPagination({startPage, totalPage, param}: {startPage: number; totalPage: number; param: MultiplePagesPaginationParam}) {
  const {
    currentPage,
    config: {pagePerView}
  } = param;

  const tempEndPage = startPage + pagePerView - 1;
  const endPage = tempEndPage > totalPage ? totalPage : tempEndPage;

  const pages = range(startPage, endPage);

  const betweenPageElementDataList = pages.map((page) => {
    const active = currentPage === page;
    const disable = false;

    return {
      page: active ? currentPage : page,
      disable,
      active,
      prevent: disable || active
    } as PageElementData;
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
  methods: PaginationMethod;
  linkProps?: Pick<LinkProps, "scroll" | "replace">;
}

export type MultiplePagesPaginationParam = CorePaginationParam<MultiplePagesPaginationConfig>;

export interface MultiplePagesPaginationComponentProps extends MultiplePagesPaginationParam {
  methods: PaginationMethod;
  linkProps?: Pick<LinkProps, "scroll" | "replace">;
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
