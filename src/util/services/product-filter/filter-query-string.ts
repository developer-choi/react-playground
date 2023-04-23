import {useRouter} from 'next/router';
import {getTypedQueryCallback, QueryValue, validateNumber, validateString} from '@util/extend/browser/query-string';
import type {ParsedUrlQuery} from 'querystring';
import ValidateError from '@util/services/handle-error/ValidateError';
import {useKeepQuery} from '@util/extend/router';
import {useCallback, useMemo} from 'react';
import produce from 'immer';
import type {
  FilterFormData,
  FilterListRecord,
  FilterResult,
  FilterType,
} from '@type/services/filter';
import {useFilterPkListToResult} from '@util/services/product-filter/filter-common';

/*************************************************************************************************************
 * Exported functions
 *************************************************************************************************************/

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
    currentFilterListRecord,
    applyFilterInQueryString,
    removeFilterInQueryString
  };
}

export function useCurrentAppliedFilterResultList() {
  const {currentFilterListRecord} = useFilterQueryString();
  return useFilterPkListToResult(currentFilterListRecord);
}

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
    a[b.filterType as FilterType] = b.list;
    return a;
  }, {} as FilterListRecord);

  const page = validateNumber(typedQuery.page);

  return {
    page,
    filterListRecord
  };
}

export const getFilterQuery = getTypedQueryCallback<ProductListQueryKey, ProductListParamKey>();

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/

type ProductListQueryKey = FilterType | 'page';
type ProductListParamKey = 'categoryPk' | 'brandPk' | 'gmarket-best-category';
const PRODUCT_LIST_PARAM_KEY: ProductListParamKey[] = ['brandPk', 'gmarket-best-category', 'categoryPk'];

const SEPARATOR_QUERY_STRING = '_';
