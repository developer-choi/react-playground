import {SubmitHandler, useFormContext} from 'react-hook-form';
import type {FilterType, ProductListPageParam} from '@util/services/product-filter/filter-common';
import {useFilterListQuery, useFilterResultWithName} from '@util/services/product-filter/filter-common';
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

/**
 * 필터폼 전체를 컨트롤하는 모듈입니다.
 * 
 * 여기에서 export하는 함수 모두
 * <FormProvider 하위 컴포넌트에서 사용해야합니다.
 * 
 * 1. 필터폼에서 제출하고 리셋하는 hooks가 있고,
 * 2. [현재 적용된 필터]가 변경되면 [현재 체크된 필터]에도 반영하는 최신화로직이 있습니다.
 */

/**
 * TODO 필터 폼데이터를 이렇게잡는게 아주 유효했음. 변환함수 절반이 줄어듬.
 * 1. onSubmitCategory()부터 시작해서 onSubmitShipping()까지 다 필요없어짐.
 */
export type FilterFormData = Record<FilterType, NumericString[]>;

export const DEFAULT_FILTER_FORM_DATA: FilterFormData = {
  category: [],
  brand: [],
  color: [],
  size: []
};

function convertFormDataWhenSubmit(formData: FilterFormData, originalCategoryFilterList: CategoryFilter[]): FilterFormData {
  const {category, ...rest} = formData;

  const removedCategoryPkList = removeCategoryChildren(category, originalCategoryFilterList);

  return {
    ...rest,
    category: removedCategoryPkList,
  };
}

// 상품필터목록에서 useFormContext()에서 onSubmit, reset 2개 커스텀했음.
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

  return useFilterResultWithName(productListPageParam, willSubmittedFormData);
}

// [현재 적용된 필터 = query string]이 변경되면 [현재 체크된 필터 = form data]에도 반영하기위함.
export function useRefreshFilterFormData(productListPageParam: ProductListPageParam) {
  const {currentFilterListRecord} = useFilterQueryString();

  //TODO 이부분이 애트니와 다름.
  const {reset, setValue} = useHandleFilterForm(productListPageParam);
  const {data} = useFilterListQuery(productListPageParam);
  const categoryList = data?.categoryList ?? EMPTY_ARRAY;

  useEffect(() => {
    return () => {
      reset();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productListPageParam.type, productListPageParam.uniqueKey]);

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
    //TODO 이부분이 애트니와 다름. 왜 처음에 리셋해야하는지 모르겠음. 어차피 모든 카테고리값 다 최신화할건데.
    // reset();

    //TODO 이부분에 가격필터 추가예정
    const {category, ...restRecord} = currentFilterListRecord;

    refreshCategoryFilter(category);
    refreshRestFilter(restRecord);

    //TODO 이부분도 애트니와 다름.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilterListRecord]);
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
