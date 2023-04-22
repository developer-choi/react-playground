import type {FilterFormData} from '@util/services/product-filter/filter-form';
import type {NumericString} from '@type/string';
import type {FilterListResponse} from '@type/response/filter';
import type {CategoryFilter, GeneralFilter} from '@type/response-sub/filter-sub';
import type {FilterListApiParam} from '@api/filter-api';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo} from 'react';
import {getFilterListApi} from '@api/filter-api';
import {flatDeepCategoryList} from '@util/services/product-filter/category-filter';

/**
 * 주로 필터 데이터를 변환하는 함수와
 * 공통 데이터타입 포함.
 */

//https://corners.gmarket.co.kr/BestSellers
export type GmarketBestCategoryType = 'all' | 'fashion-clothes' | 'shoes';

/**
 * 상품리스트 페이지의 타입.
 * 단순 카테고리 상품리스트 / 브랜드 상품리스트 / 검색리스트 / 베스트 상품리스트 (지마켓 베스트)
 */
export type ProductListPageType = 'category' | 'brand' | 'search' | 'g-market-best';

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

export type FilterType = 'category' | 'brand' | 'size' | 'color';
export type FilterListRecord = Record<FilterType, number[]>;

export interface FilterResult {
  pk: number;
  type: FilterType;
}

export function useFilterListQuery({type, uniqueKey}: FilterListApiParam) {
  return useQuery({
    queryKey: ['filter-list', type, uniqueKey],
    queryFn: () => getFilterListApi({type, uniqueKey}),
    staleTime: 5 * 60 * 1000
  });
}

type GeneralFilterPkOriginalRecord = Record<Exclude<FilterType, 'category'>, Record<number, GeneralFilter>>;

export interface FilterPkOriginalRecord extends GeneralFilterPkOriginalRecord {
  category: Record<number, CategoryFilter>;
}

export function filterListResponseToPkOriginalRecord(response: FilterListResponse): FilterPkOriginalRecord {
  const {colorList, sizeList, categoryList, brandList} = response;

  const responseByFilterType: Record<FilterType, GeneralFilter[] | CategoryFilter[]> = {
    color: colorList,
    brand: brandList,
    size: sizeList,
    category: flatDeepCategoryList(categoryList)
  };

  return Object.entries(responseByFilterType).reduce((a, [filterType, filterList]) => {
    filterList.forEach(filter => {
      // eslint-disable-next-line no-param-reassign
      a[filterType as FilterType][filter.pk] = filter;
    });

    return a;
  }, {...INITIAL_FILTER_PK_ORIGINAL_RECORD});
}

const INITIAL_FILTER_PK_ORIGINAL_RECORD: FilterPkOriginalRecord = {
  category: {},
  size: {},
  brand: {},
  color: {}
};

//TODO 테스트필요
export function useFilterPkOriginalRecordQuery({type, uniqueKey}: FilterListApiParam): FilterPkOriginalRecord {
  const queryClient = useQueryClient();
  const {data} = useFilterListQuery({type, uniqueKey});

  const queryKey = useMemo(() => {
    return ['filter-pk-original-record', type, uniqueKey]
  }, [type, uniqueKey]);
  
  //TODO 새로운시도 ㅇㅇ
  const result = useQuery<FilterPkOriginalRecord>({
    queryKey,
    enabled: false
  })

  useEffect(() => {
    const filterPkOriginalRecord = queryClient.getQueryData<FilterPkOriginalRecord>(queryKey);
    
    if (!filterPkOriginalRecord && data) {
      queryClient.setQueryData(queryKey, filterListResponseToPkOriginalRecord(data));
    }

  }, [data, queryClient, queryKey]);

  return result.data ?? INITIAL_FILTER_PK_ORIGINAL_RECORD;
}

export interface FilterResultWithName extends FilterResult {
  name: string;
}

export function useFilterResultWithName(productListPageParam: ProductListPageParam, data: FilterListRecord | FilterFormData): FilterResultWithName[] {
  const filterResultList = Object.entries(data).reduce((a, [filterType, pkList]) => {
    return a.concat(pkList.map((pk: number | NumericString) => ({pk: Number(pk), type: filterType as FilterType})));
  }, [] as FilterResult[]).flat();

  const pkOriginalRecord = useFilterPkOriginalRecordQuery(productListPageParam);

  return useMemo(() => {
    return filterResultList.map(({pk, type}) => {
      const original = pkOriginalRecord[type][pk];
      let name: string;

      switch (type) {
        case 'category':
          name = (original as CategoryFilter).name;
          break;

        default:
          name = (original as GeneralFilter).name;
      }

      return {
        pk,
        type,
        name
      };
    });
  }, [pkOriginalRecord, filterResultList]);
}
