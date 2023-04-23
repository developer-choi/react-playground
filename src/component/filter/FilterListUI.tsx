import React from 'react';
import {CategoryCheckbox, GeneralFilterCheckbox} from '@component/filter/FilterCheckbox';
import {useFilterListQuery} from '@util/services/product-filter/filter-common';
import type {FilterType} from '@type/services/filter';

export function CategoryFilterListUI() {
  const {data} = useFilterListQuery();

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
}

export function GeneralFilterListUI({filterType}: GeneralFilterListUIProp) {
  const {data} = useFilterListQuery();

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
