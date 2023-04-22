import React from 'react';
import {CategoryCheckbox, GeneralFilterCheckbox} from '@component/filter/FilterCheckbox';
import {useFilterListQuery} from '@util/services/product-filter/filter-common';
import type {FilterType, ProductListPageParam} from '@type/services/filter';

export interface CategoryFilterListUIProp {
  productListPageParam: ProductListPageParam;
}

export function CategoryFilterListUI({productListPageParam}: CategoryFilterListUIProp) {
  const {data} = useFilterListQuery(productListPageParam);

  if (!data) {
    return null;
  }

  return (
    <>
      {data.categoryList.map(category => (
        <CategoryCheckbox key={category.pk} category={category} />
      ))}
    </>
  );
}

export interface GeneralFilterListUIProp {
  filterType: FilterType;
  productListPageParam: ProductListPageParam;
}

export function GeneralFilterListUI({filterType, productListPageParam}: GeneralFilterListUIProp) {
  const {data} = useFilterListQuery(productListPageParam);

  if (!data) {
    return null;
  }

  const filterList = data[`${filterType}List`];

  return (
    <>
      {filterList.map(filter => (
        <GeneralFilterCheckbox key={filter.pk} filter={filter} filterType={filterType} />
      ))}
    </>
  );
}
