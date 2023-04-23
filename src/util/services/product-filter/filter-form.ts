import {SubmitHandler, useFormContext} from 'react-hook-form';
import {useFilterListQuery, useFilterPkListToResult} from '@util/services/product-filter/filter-common';
import type {NumericString} from '@type/string';
import {ChangeEvent, ComponentPropsWithoutRef, useCallback, useEffect, useMemo} from 'react';
import {useFilterQueryString} from '@util/services/product-filter/filter-query-string';
import {EMPTY_ARRAY, removeDuplicatedItems} from '@util/extend/data-type/array';
import {
  flatDeepCategoryList,
  removeCategoryChildren,
  restoreCategoryChildren
} from '@util/services/product-filter/category-filter';
import type {CategoryCheckboxProp, GeneralFilterCheckboxProp} from '@component/filter/FilterCheckbox';
import type {CategoryFilter} from '@type/response-sub/filter-sub';
import type {FilterFormData, FilterType, ProductListPageParam} from '@type/services/filter';

/** Notice
 * 여기에서 export하는 함수 모두
 * <FormProvider 하위 컴포넌트에서 사용헤야함.
 */

/*************************************************************************************************************
 * Exported functions
 *************************************************************************************************************/

/**
 * 1. 폼 데이터를 컨트롤할 수 있는 onSubmit, reset 함수 제공
 * 2. 폼 데이터에 영향을 주는 요소들에 대한 처리 반영
 * (1) 다룬 종류의 상품리스트로 이동할 경우 폼데이터 초기화
 * (2) 쿼리스트링이 변하면 (최초 로딩포함) 폼데이터에 반영
 */
export function useHandleFilterForm(productListPageParam: ProductListPageParam) {
  const methods = useFormContext<FilterFormData>();
  const {applyFilterInQueryString} = useFilterQueryString();
  const {data} = useFilterListQuery(productListPageParam);

  const onSubmit: SubmitHandler<FilterFormData> = useCallback(formData => {
    if (!data) {
      return;
    }
    
    applyFilterInQueryString(convertFormDataWhenSubmit(formData, data.categoryList));
  }, [applyFilterInQueryString, data]);

  const reset = useCallback(() => {
    methods.reset(DEFAULT_FILTER_FORM_DATA);
  }, [methods]);

  //다른 종류의 상품리스트 페이지로 이동하는경우 폼데이터 초기화
  useEffect(() => {
    return () => {
      reset();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productListPageParam.type, productListPageParam.uniqueKey]);

  useRefreshFilterFormData(productListPageParam);

  return {
    setValue: methods.setValue,
    onSubmit: methods.handleSubmit(onSubmit),
    reset
  };
}

export function useCurrentCheckedFilterResultList(productListPageParam: ProductListPageParam) {
  const {watch} = useFormContext<FilterFormData>();
  const {data} = useFilterListQuery(productListPageParam);
  const currentFormData = watch();

  const willSubmittedFormData = useMemo(() => {
    return convertFormDataWhenSubmit(currentFormData, data?.categoryList ?? []);
  }, [data?.categoryList, currentFormData]);

  return useFilterPkListToResult(productListPageParam, willSubmittedFormData);
}

export function useHandleCategoryCheckbox({category, onChangeRecursiveOfParent}: CategoryCheckboxProp) {
  const {register, setValue, getValues} = useFormContext<FilterFormData>();

  //this category의 모든 후손들 (자식, 자식의자식 포함)
  const allChildrenPkList = useMemo(() => {
    return flatDeepCategoryList(category.children).map(({pk}) => String(pk) as NumericString);
  }, [category.children]);

  const onChangeRecursive = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (allChildrenPkList.length > 0) {
      const previousCategoryPkList = getValues('category');
      const allChildrenAreChecked = allChildrenPkList.every((pk) => previousCategoryPkList.includes(pk));
      const stringPk = String(category.pk) as NumericString;
      
      if (allChildrenAreChecked) {
        setValue('category', removeDuplicatedItems(previousCategoryPkList.concat(stringPk)));

      } else {
        setValue('category', previousCategoryPkList.filter(previousPk => previousPk !== stringPk));
      }
    }

    onChangeRecursiveOfParent?.(event);
  }, [allChildrenPkList, category.pk, getValues, onChangeRecursiveOfParent, setValue]);

  const {onChange: onChangeNative} = register('category');

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeNative(event).then();
    const previousCategoryPkList = getValues('category');

    if (event.target.checked) {
      setValue('category', removeDuplicatedItems(previousCategoryPkList.concat(allChildrenPkList)));
    } else {
      setValue('category', previousCategoryPkList.filter(previousPk => !allChildrenPkList.includes(previousPk)));
    }

    onChangeRecursive(event);
  }, [allChildrenPkList, getValues, onChangeNative, onChangeRecursive, setValue]);

  return {
    inputProps: {
      ...register('category'),
      value: category.pk,
      onChange
    },
    onChangeRecursive
  };
}

export function useHandleGeneralCheckbox({filterType, filter}: GeneralFilterCheckboxProp): ComponentPropsWithoutRef<'input'> {
  const {register} = useFormContext<FilterFormData>();
  const {onChange: onChangeNative, ...rest} = register(filterType);

  //이렇게 안하면 버그생김. 출처: /study/rhf/custom-onchange-checkbox.tsx
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeNative(event);
  }, [onChangeNative]);

  return {
    ...rest,
    value: filter.pk,
    onChange
  };
}

/*************************************************************************************************************
 * Exported variables
 *************************************************************************************************************/

export const DEFAULT_FILTER_FORM_DATA: FilterFormData = {
  category: [],
  brand: [],
  color: [],
  size: []
};

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/

function convertFormDataWhenSubmit(formData: FilterFormData, originalCategoryFilterList: CategoryFilter[]): FilterFormData {
  const {category, ...rest} = formData;

  const removedCategoryPkList = removeCategoryChildren(category, originalCategoryFilterList);

  return {
    ...rest,
    category: removedCategoryPkList,
  };
}

// [현재 적용된 필터 = query string]이 변경되면 [현재 체크된 필터 = form data]에도 반영하기위함.
function useRefreshFilterFormData(productListPageParam: ProductListPageParam) {
  const {currentFilterListRecord} = useFilterQueryString();
  const {setValue} = useFormContext<FilterFormData>();
  const {data} = useFilterListQuery(productListPageParam);
  const categoryList = data?.categoryList ?? EMPTY_ARRAY;

  //쿼리스트링에 있던 값으로 폼데이터 > 카테고리 필터값 복원하는 로직
  const refreshCategoryFilter = useCallback((parentCategoryPkList: number[]) => {
    const categoryPkList = restoreCategoryChildren(parentCategoryPkList, categoryList);
    setValue('category', categoryPkList);
  }, [categoryList, setValue]);

  //쿼리스트링에 있던 값으로 폼데이터 > 일반 필터값 복원하는 로직
  const refreshRestFilter = useCallback((record: Record<Exclude<FilterType, 'category'>, number[]>) => {
    Object.entries(record).forEach(([filterType, pkList]) => {
      setValue(filterType as FilterType, pkList.map(pk => String(pk) as NumericString));
    });
  }, [setValue]);

  useEffect(() => {
    //TODO 이부분에 가격필터 추가예정
    const {category, ...restRecord} = currentFilterListRecord;

    refreshCategoryFilter(category);
    refreshRestFilter(restRecord);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilterListRecord]);
}
