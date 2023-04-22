import React from 'react';
import styled from 'styled-components';
import Button from '@component/atom/element/Button';
import {useHandleFilterForm, useRefreshFilterFormData} from '@util/services/product-filter/filter-form';
import {CategoryFilterListUI, GeneralFilterListUI} from '@component/filter/FilterListUI';
import type {ProductListPageParam} from '@util/services/product-filter/filter-common';
import {useFilterListQuery} from '@util/services/product-filter/filter-common';

export interface FilterFormProp {
  productListPageParam: ProductListPageParam;
}

export default function FilterForm({productListPageParam}: FilterFormProp) {
  useRefreshFilterFormData(productListPageParam);

  const {data} = useFilterListQuery(productListPageParam);
  const {onSubmit, reset} = useHandleFilterForm(productListPageParam);

  if (!data) {
    return null;
  }

  const {categoryList, brandList, colorList, sizeList} = data;

  return (
    <Form onSubmit={onSubmit}>
      <CategoryFilterListUI filterList={categoryList}/>
      <GeneralFilterListUI filterType="brand" filterList={brandList}/>
      <GeneralFilterListUI filterType="color" filterList={colorList}/>
      <GeneralFilterListUI filterType="size" filterList={sizeList}/>
      <Button className="gray" onClick={reset}>초기화</Button>
      <Button type="submit">제출</Button>
    </Form>
  );
}

const Form = styled.form`
  padding: 10px;
  display: inline-block;
`;
