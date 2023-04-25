import type {NumericString} from '@type/string';
import type {CategoryFilter, GeneralFilter} from '@type/response-sub/filter-sub';

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

export type FilterPkListInQueryString = RegularFilterPkList<number> & PriceFilterValue; //쿼리스트링에서 가져온 필터 데이터 타입
export type FilterFormData = RegularFilterPkList<NumericString> & PriceFilterValue; //필터의 폼데이터 타입

/**
 * 1. 가격필터는 값이 존재하면 number, 값이 없으면 (= 가격필터 안건듬) undefined
 * 2. 나머지 필터는 모두 pk list 형태. (단, 쿼리스트링에서 온건 number타입, 폼데이터꺼는 문자열 타입)
 */
export type RegularFilterPkList<P extends number | NumericString> = Record<RegularFilterType, P[]>;
export type PriceFilterValue = Record<PriceFilterType, number | undefined>;

export interface FilterResult {
  pk?: number; //가격필터는 없음.
  type: FilterType;
  name: string;
}

//적용된 필터목록을 보여주기위한 원본 API 데이터
export interface FilterPkOriginalRecord extends Record<Exclude<RegularFilterType, 'category'>, Record<number, GeneralFilter>> {
  category: Record<number, CategoryFilter>;
  maxPrice: number;
  minPrice: number;
}

export type FilterType = RegularFilterType | PriceFilterType;
export type RegularFilterType = 'category' | 'brand' | 'size' | 'color';
export type PriceFilterType = 'min-price' | 'max-price';

/**
 * 상품리스트 페이지의 타입.
 * 단순 카테고리 상품리스트 / 브랜드 상품리스트 / 검색리스트 / 베스트 상품리스트 (지마켓 베스트)
 */
export type ProductListPageType = 'category' | 'brand' | 'search' | 'g-market-best';

//https://corners.gmarket.co.kr/BestSellers
export type GmarketBestCategoryType = 'all' | 'fashion-clothes' | 'shoes';
