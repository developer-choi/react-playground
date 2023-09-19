import type {NumericString} from '@type/string';
import type {FilterListResponse} from '@type/response/filter';
import type {CategoryFilter, GeneralFilter} from '@type/response-sub/filter-sub';
import {getFilterListApi} from '@api/filter-api';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {createContext, PropsWithChildren, useContext, useEffect, useMemo} from 'react';
import {flatDeepCategoryList} from '@util/services/product-filter/category-filter';
import type {
  FilterFormData,
  FilterPkListInQueryString,
  FilterPkOriginalRecord,
  AppliedFilter,
  PriceFilterValue,
  ProductListPageParam,
  RegularFilterType
} from '@type/services/filter';
import {priceToFilterResult} from '@util/services/product-filter/price-filter';

/*************************************************************************************************************
 * Exported functions
 *************************************************************************************************************/

export function useProductListPageParam() {
  const value = useContext(ProductListPageParamContext);

  if (value === undefined) {
    throw new Error('context의 value값이 전달되지 않았습니다. 최상위 부모 컴포넌트에 ProductListPageParamProvider가 감싸져있는지 확인하세요.');
  }

  return value;
}

export function ProductListPageParamProvider({children, value}: PropsWithChildren<{value: ProductListPageParam}>) {
  return (
    <ProductListPageParamContext.Provider value={value}>
      {children}
    </ProductListPageParamContext.Provider>
  )
}

export function useFilterListQuery() {
  const {type, uniqueKey} = useProductListPageParam();

  return useQuery({
    queryKey: ['filter-list', type, uniqueKey],
    queryFn: () => getFilterListApi({type, uniqueKey}),
    staleTime: 5 * 60 * 1000
  });
}

/**
 * 1. 폼데이터 ==> [현재 체크된 목록]
 * 2. 쿼리스트링 ==> [현재 적용된 목록]
 * 으로 변환하기위한 함수
 */
export function useFilterPkListToResult(data: FilterPkListInQueryString | FilterFormData): AppliedFilter[] {
  const pkOriginalRecord = useFilterPkOriginalRecordQuery();

  return useMemo(() => {
    if (pkOriginalRecord === undefined) {
      return [];
    }

    const regularFilterResultList =  regularToFilterResult(data, pkOriginalRecord); //name을 제외하고 가공해서 하나의 배열로 펼침
    const priceFilterResultList = priceToFilterResult(data, pkOriginalRecord);
    return regularFilterResultList.concat(priceFilterResultList);
  }, [data, pkOriginalRecord]);
}

export function useFilterPkOriginalRecordQuery(): FilterPkOriginalRecord | undefined {
  const {type, uniqueKey} = useProductListPageParam();
  const queryClient = useQueryClient();
  const {data} = useFilterListQuery();

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

  return result.data;
}

/*************************************************************************************************************
 * Exported variables
 *************************************************************************************************************/

export const REGULAR_FILTER_TYPE_LIST: RegularFilterType[] = ['size', 'category', 'brand', 'color'];

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/

function regularToFilterResult(data: FilterPkListInQueryString | FilterFormData, pkOriginalRecord: FilterPkOriginalRecord): AppliedFilter[] {
  const {category, color, brand, size} = data;
  const regularFilter: Record<RegularFilterType, (NumericString | number)[]> = {category, brand, size, color}

  const tempFilterResultList = Object.entries(regularFilter).reduce((a, [filterType, pkList]) => {
    return a.concat(pkList.map((pk: number | NumericString) => ({pk: Number(pk), type: filterType as RegularFilterType, name: undefined})));
  }, [] as TempRegularFilterResult[]).flat();

  return tempFilterResultList.reduce((a, {pk, type}) => {
    const original = pkOriginalRecord[type as RegularFilterType][pk as number];

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
  }, [] as AppliedFilter[]);
}

function filterListResponseToPkOriginalRecord(response: FilterListResponse): FilterPkOriginalRecord {
  const {colorList, sizeList, categoryList, brandList, maxPrice, minPrice} = response;

  const responseByFilterType: Record<RegularFilterType, GeneralFilter[] | CategoryFilter[]> = {
    color: colorList,
    brand: brandList,
    size: sizeList,
    category: flatDeepCategoryList(categoryList)
  };

  const {category, color, brand, size} = Object.entries(responseByFilterType).reduce((a, [filterType, filterList]) => {
    filterList.forEach(filter => {
      // eslint-disable-next-line no-param-reassign
      a[filterType as RegularFilterType][filter.pk] = filter;
    });

    return a;
  }, {
    category: {},
    size: {},
    brand: {},
    color: {},
  } as Omit<FilterPkOriginalRecord, keyof PriceFilterValue>);

  return {
    size,
    brand,
    color,
    category,
    maxPrice,
    minPrice
  };
}

type TempRegularFilterResult = Omit<AppliedFilter, 'name'> & {
  name: undefined | string;
};

const ProductListPageParamContext = createContext<ProductListPageParam>(null as any);
