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

/**
 * 상품리스트 페이지의 타입.
 * 단순 카테고리 상품리스트 / 브랜드 상품리스트 / 검색리스트 / 베스트 상품리스트 (지마켓 베스트)
 */
export type ProductListPageType = 'category' | 'brand' | 'search' | 'g-market-best';

//https://corners.gmarket.co.kr/BestSellers
export type GmarketBestCategoryType = 'all' | 'fashion-clothes' | 'shoes';

export interface FilterResult {
  pk: number;
  type: FilterType;
}

export type FilterListRecord = Record<FilterType, number[]>;

export type FilterType = 'category' | 'brand' | 'size' | 'color';

export type FilterFormData = Record<FilterType, NumericString[]>;
