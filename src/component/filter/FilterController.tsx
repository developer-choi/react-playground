import React from 'react';
import FilterForm from '@component/filter/FilterForm';
import {FormProvider, useForm} from 'react-hook-form';
import CheckedFilterList from '@component/filter/CheckedFilterList';
import type {FilterFormData} from '@util/services/product-filter/filter-form';
import {DEFAULT_FILTER_FORM_DATA} from '@util/services/product-filter/filter-form';
import type {ProductListPageParam} from '@util/services/product-filter/filter-common';

export interface FilterControllerProp {
  productListPageParam: ProductListPageParam;
}

export default function FilterController({productListPageParam}: FilterControllerProp) {
  const methods = useForm<FilterFormData>({
    defaultValues: DEFAULT_FILTER_FORM_DATA
  });

  //TODO 현실적인 컴포넌트 구조인지. (애트니랑 대조)
  //TODO 이렇게 컴포넌트 구조 해도 폼 컨트롤 되는지. 원래 폼 프로바이더 바로밑에 <form 했었는데.
  //현재 체크된 필터목록의 데이터의 출처는 폼데이터이므로 FormProvider안에 같이 위치
  return (
    <FormProvider {...methods}>
      <CheckedFilterList productListPageParam={productListPageParam}/>
      <FilterForm productListPageParam={productListPageParam}/>
    </FormProvider>
  );
}
