import type {NumericString} from '@type/string';

//상품리스트 페이지를 구분할 수 있는값
export interface ProductListPageParam {
  type: ProductListPageType;

  /**
   * 카테고리상품리스트, 브랜드상품리스트에서는 uniqueKey가 카테고리PK, 브랜드PK가 되고,
   * 검색리스트에서는 검색어가되고,
   * 지마켓베스트 상품리스트에서는 지마켓 베스트 카테고리가됨.
   */
  uniqueKey: number | string | GmarketBestCategoryType;

  page: number;
}

//쿼리스트링에서 가져온 필터데이터를 가공한 타입. 이것을 FilterFormData와 유사하게 지은것이 대박 유효했음.
export type FilterListRecord = Record<FilterType, number[]>; //쿼리스트링에서 가져온 필터 데이터 타입
export type FilterFormData = Record<FilterType, NumericString[]>; //필터의 폼데이터 타입

export interface FilterResult {
  pk: number;
  type: FilterType;
  name: string;
}

export type FilterType = 'category' | 'brand' | 'size' | 'color';

/**
 * 상품리스트 페이지의 타입.
 * 단순 카테고리 상품리스트 / 브랜드 상품리스트 / 검색리스트 / 베스트 상품리스트 (지마켓 베스트)
 */
export type ProductListPageType = 'category' | 'brand' | 'search' | 'g-market-best';

//https://corners.gmarket.co.kr/BestSellers
export type GmarketBestCategoryType = 'all' | 'fashion-clothes' | 'shoes';
