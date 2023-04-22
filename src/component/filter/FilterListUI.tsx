import type {CategoryFilter, GeneralFilter} from '@type/response-sub/filter-sub';
import React from 'react';
import type {FilterType} from '@util/services/product-filter/filter-common';
import {CategoryCheckbox, GeneralFilterCheckbox} from '@component/filter/FilterCheckbox';

export interface CategoryFilterListUIProp {
  filterList: CategoryFilter[];
}

export function CategoryFilterListUI({filterList}: CategoryFilterListUIProp) {
  return (
    <>
      {filterList.map(category => (
        <CategoryCheckbox key={category.pk} category={category} />
      ))}
    </>
  );
}

export interface GeneralFilterListUIProp {
  filterList: GeneralFilter[];
  filterType: FilterType;
}

export function GeneralFilterListUI({filterList, filterType}: GeneralFilterListUIProp) {
  return (
    <>
      {filterList.map(filter => (
        <GeneralFilterCheckbox key={filter.pk} filter={filter} filterType={filterType} />
      ))}
    </>
  );
}
