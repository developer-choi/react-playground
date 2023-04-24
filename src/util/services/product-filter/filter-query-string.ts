import {useRouter} from 'next/router';
import {getTypedQueryCallback, QueryValue, validateNumber, validateString} from '@util/extend/browser/query-string';
import type {ParsedUrlQuery} from 'querystring';
import ValidateError from '@util/services/handle-error/ValidateError';
import {useKeepQuery} from '@util/extend/router';
import {useCallback, useMemo} from 'react';
import produce from 'immer';
import type {
  FilterFormData,
  FilterPkListInQueryString,
  FilterResult,
  FilterType,
  PriceFilterType,
  PriceFilterValue,
  RegularFilterPkList,
  RegularFilterType,
} from '@type/services/filter';
import {REGULAR_FILTER_TYPE_LIST, useFilterPkListToResult} from '@util/services/product-filter/filter-common';

/*************************************************************************************************************
 * Exported functions
 *************************************************************************************************************/

//쿼리스트링으로부터 필터값을 읽고 쓰는 함수
export function useFilterQueryString() {
  const originalQuery = useRouter().query;

  const {filterPkList: currentFilterPkList} = useMemo(() => {
    return validateFilterQueryString(originalQuery)
  }, [originalQuery]);

  const {replaceKeepQuery} = useKeepQuery<ProductListQueryKey>(PRODUCT_LIST_PARAM_KEY);

  const applyFilterInQueryString = useCallback((data: FilterPkListInQueryString | FilterFormData) => {
    const {['min-price']: minPrice, ['max-price']: maxPrice, ...regularFilter} = data;

    const stringifiedRecord = Object.entries(regularFilter).reduce((a, [filterType, pkList]) => {
      // eslint-disable-next-line no-param-reassign
      a[filterType as RegularFilterType] = pkList.join(SEPARATOR_QUERY_STRING);
      return a;
    }, {} as Record<FilterType, string | undefined>);

    stringifiedRecord['min-price'] = minPrice?.toString();
    stringifiedRecord['max-price'] = maxPrice?.toString();

    replaceKeepQuery(stringifiedRecord);
  }, [replaceKeepQuery]);

  const removeFilterInQueryString = useCallback((filterResult: FilterResult) => {
    const nextFilterRecord = removeSpecificFilter(currentFilterPkList, filterResult);
    applyFilterInQueryString(nextFilterRecord);
  }, [applyFilterInQueryString, currentFilterPkList]);

  return {
    currentFilterPkList,
    applyFilterInQueryString,
    removeFilterInQueryString
  };
}

export function useCurrentAppliedFilterResultList() {
  const {currentFilterPkList} = useFilterQueryString();
  return useFilterPkListToResult(currentFilterPkList);
}

/**
 * 쿼리스트링으로부터 필터값을 가져옵니다.
 * @exception ValidateError 필터가 존재하는데 이상한값인경우
 */
export function validateFilterQueryString(query: ParsedUrlQuery) {
  const typedQuery = getFilterQuery(query);

  const regularFilterQuery: Record<RegularFilterType, QueryValue> = {
    color: typedQuery.color,
    size: typedQuery.size,
    brand: typedQuery.brand,
    category: typedQuery.category
  };

  const regularFilterResult: RegularFilterPkList<number> = Object.entries(regularFilterQuery).map(([filterType, queryString]) => {
    const validatedString = validateString(queryString, {required: false});
    const splitResult = validatedString?.split(SEPARATOR_QUERY_STRING).map(value => Number(value)) ?? [];

    if (splitResult.some(value => Number.isNaN(value))) {
      console.error(filterType, splitResult);
      throw new ValidateError('잘못된 필터값입니다.');
    }

    return {
      filterType,
      list: splitResult
    };
  }).reduce((a, b) => {
    // eslint-disable-next-line no-param-reassign
    a[b.filterType as RegularFilterType] = b.list;
    return a;
  }, {} as RegularFilterPkList<number>);

  const priceFilterResult: PriceFilterValue = {
    'min-price': validateNumber(typedQuery['min-price'], {required: false}),
    'max-price': validateNumber(typedQuery['max-price'], {required: false})
  };

  const page = validateNumber(typedQuery.page);

  return {
    page,
    filterPkList: {
      ...regularFilterResult,
      ...priceFilterResult
    }
  };
}

export const getFilterQuery = getTypedQueryCallback<ProductListQueryKey, ProductListParamKey>();

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/

function removeSpecificFilter(currentFilterPkList: FilterPkListInQueryString, removeTarget: FilterResult): FilterPkListInQueryString {
  const {pk, type} = removeTarget;

  return produce(currentFilterPkList, draft => {
    if (REGULAR_FILTER_TYPE_LIST.includes(type as RegularFilterType)) {
      const target = draft[type] as number[];
      const index = target.findIndex(value => value === pk);

      if (index !== -1) {
        target.splice(index, 1);
      }

    } else {
      // eslint-disable-next-line no-param-reassign
      draft[type as PriceFilterType] = undefined;
    }
  });
}

type ProductListQueryKey = FilterType | 'page';
type ProductListParamKey = 'categoryPk' | 'brandPk' | 'gmarket-best-category';
const PRODUCT_LIST_PARAM_KEY: ProductListParamKey[] = ['brandPk', 'gmarket-best-category', 'categoryPk'];

const SEPARATOR_QUERY_STRING = '_';
