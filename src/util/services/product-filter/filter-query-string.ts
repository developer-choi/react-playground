import {useRouter} from 'next/router';
import {getTypedQueryCallback, QueryValue, validateNumber, validateString} from '@util/extend/browser/query-string';
import type {ParsedUrlQuery} from 'querystring';
import ValidateError from '@util/services/handle-error/ValidateError';
import {useKeepQuery} from '@util/extend/router';
import {useCallback, useMemo} from 'react';
import type {FilterFormData} from '@util/services/product-filter/filter-form';
import produce from 'immer';
import type {FilterListRecord, FilterResult, FilterType} from '@util/services/product-filter/filter-common';
import {ProductListPageParam, useFilterResultWithName} from '@util/services/product-filter/filter-common';

type ProductListQueryKey = FilterType | 'page';
type ProductListParamKey = 'categoryPk' | 'brandPk' | 'gmarket-best-category';
const PRODUCT_LIST_PARAM_KEY: ProductListParamKey[] = ['brandPk', 'gmarket-best-category', 'categoryPk'];

export const getFilterQuery = getTypedQueryCallback<ProductListQueryKey, ProductListParamKey>();

//쿼리스트링으로부터 필터값을 읽고 쓰는 함수
export function useFilterQueryString() {
  const originalQuery = useRouter().query;
  const {filterListRecord: currentFilterListRecord} = useMemo(() => {
    return validateFilterQueryString(originalQuery)
  }, [originalQuery]);

  const {replaceKeepQuery} = useKeepQuery<ProductListQueryKey>(PRODUCT_LIST_PARAM_KEY);

  const applyFilterInQueryString = useCallback((record: FilterListRecord | FilterFormData) => {
    const stringifiedRecord = Object.entries(record).reduce((a, [filterType, pkList]) => {
      // eslint-disable-next-line no-param-reassign
      a[filterType as FilterType] = pkList.join(SEPARATOR_QUERY_STRING);
      return a;
    }, {} as Record<FilterType, string>);

    replaceKeepQuery(stringifiedRecord);
  }, [replaceKeepQuery]);

  //TODO 이부분이 애트니와 로직이 다른데 이게나은듯.
  const removeFilterInQueryString = useCallback(({pk, type}: FilterResult) => {
    const nextFilterRecord = produce(currentFilterListRecord, draft => {
      const target = draft[type];
      const index = target.findIndex(value => value === pk);

      if (index !== -1) {
        target.splice(index, 1);
      }
    });

    applyFilterInQueryString(nextFilterRecord);
  }, [applyFilterInQueryString, currentFilterListRecord]);

  return {
    //현재 적용된 필터목록 (출처: 쿼리스트링)
    currentFilterListRecord, //TODO 이부분이 현재 애트니와 데이터타입이 다른데 다른게나은듯? 쓰이는곳 보니까 데이터변환 한번 덜하고 좋은듯. FilterResult 타입은 FilterResult컴포넌트빼고 아무도안쓰니까 FilterReesult컴포넌트에서 보여주기직전에 변환하는게 나은듯?
    applyFilterInQueryString,
    removeFilterInQueryString
  };
}

export function useCurrentAppliedFilterResultList(productListPageParam: ProductListPageParam) {
  const {currentFilterListRecord} = useFilterQueryString();
  return useFilterResultWithName(productListPageParam, currentFilterListRecord);
}

const SEPARATOR_QUERY_STRING = '_';

/**
 * 쿼리스트링으로부터 필터값을 가져옵니다.
 * @exception ValidateError 필터가 존재하는데 이상한값인경우
 */
export function validateFilterQueryString(query: ParsedUrlQuery) {
  const typedQuery = getFilterQuery(query);
  const filterQuery: Record<FilterType, QueryValue> = {
    color: typedQuery.color,
    size: typedQuery.size,
    brand: typedQuery.brand,
    category: typedQuery.category
  }

  const filterListRecord: FilterListRecord = Object.entries(filterQuery).map(([filterType, queryString]) => {
    //TODO validateString() required false일 때 버그가있어서 임시 타입 Assertion
    const validatedString = validateString(queryString, {required: false}) as string | undefined;
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
    a[b.filterType as FilterType] = b.list;
    return a;
  }, {} as FilterListRecord);

  const page = validateNumber(typedQuery.page);

  return {
    page,
    filterListRecord
  };
}
