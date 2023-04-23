import type {NumericString} from '@type/string';
import type {FilterListResponse} from '@type/response/filter';
import type {CategoryFilter, GeneralFilter} from '@type/response-sub/filter-sub';
import type {FilterListApiParam} from '@api/filter-api';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo} from 'react';
import {getFilterListApi} from '@api/filter-api';
import {flatDeepCategoryList} from '@util/services/product-filter/category-filter';
import type {
  FilterFormData,
  FilterListRecord,
  FilterResult,
  FilterType,
  ProductListPageParam
} from '@type/services/filter';

/*************************************************************************************************************
 * Exported functions
 *************************************************************************************************************/

export function useFilterListQuery({type, uniqueKey}: FilterListApiParam) {
  return useQuery({
    queryKey: ['filter-list', type, uniqueKey],
    queryFn: () => getFilterListApi({type, uniqueKey}),
    staleTime: 5 * 60 * 1000
  });
}

export function useFilterPkOriginalRecordQuery({type, uniqueKey}: FilterListApiParam): FilterPkOriginalRecord {
  const queryClient = useQueryClient();
  const {data} = useFilterListQuery({type, uniqueKey});

  const queryKey = useMemo(() => {
    return ['filter-pk-original-record', type, uniqueKey]
  }, [type, uniqueKey]);
  
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

export function useFilterResultWithName(productListPageParam: ProductListPageParam, data: FilterListRecord | FilterFormData): FilterResultWithName[] {
  const filterResultList = Object.entries(data).reduce((a, [filterType, pkList]) => {
    return a.concat(pkList.map((pk: number | NumericString) => ({pk: Number(pk), type: filterType as FilterType})));
  }, [] as FilterResult[]).flat();

  const pkOriginalRecord = useFilterPkOriginalRecordQuery(productListPageParam);

  return useMemo(() => {
    return filterResultList.reduce((a, {pk, type}) => {
      const original = pkOriginalRecord[type][pk];

      //API가 아직 응답되지않아서 원본데이터가 없거나, 없는 필터의 PK가 쿼리스트링에 있는경우
      if (original === undefined) {
        return a;
      }

      let name: string;

      switch (type) {
        case 'category':
          name = (original as CategoryFilter).name;
          break;

        default:
          name = (original as GeneralFilter).name;
      }

      a.push({
        pk,
        type,
        name
      });

      return a;
    }, [] as FilterResultWithName[]);
  }, [pkOriginalRecord, filterResultList]);
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/

interface FilterResultWithName extends FilterResult {
  name: string;
}

interface FilterPkOriginalRecord extends Record<Exclude<FilterType, 'category'>, Record<number, GeneralFilter>> {
  category: Record<number, CategoryFilter>;
}

function filterListResponseToPkOriginalRecord(response: FilterListResponse): FilterPkOriginalRecord {
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
