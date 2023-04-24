import React, {ChangeEvent} from 'react';
import styled from 'styled-components';
import type {CategoryFilter, GeneralFilter} from '@type/response-sub/filter-sub';
import {useHandleCategoryCheckbox, useHandleGeneralCheckbox} from '@util/services/product-filter/filter-form';
import type {RegularFilterType} from '@type/services/filter';

export interface CategoryCheckboxProp {
  category: CategoryFilter;
  onChangeRecursiveOfParent?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function CategoryCheckbox({category, onChangeRecursiveOfParent}: CategoryCheckboxProp) {
  const {onChangeRecursive, inputProps} = useHandleCategoryCheckbox({category, onChangeRecursiveOfParent});

  return (
    <Label draggable={false}>
      <input type="checkbox" {...inputProps}/>
      {category.name}
      {category.children?.map(children => (
        <CategoryCheckbox key={children.pk} category={children} onChangeRecursiveOfParent={onChangeRecursive}/>
      ))}
    </Label>
  );
}

export interface GeneralFilterCheckboxProp {
  filterType: Exclude<RegularFilterType, 'category'>;
  filter: GeneralFilter;
}

export function GeneralFilterCheckbox({filterType, filter}: GeneralFilterCheckboxProp) {
  const inputProps = useHandleGeneralCheckbox({filterType, filter});

  return (
    <Label draggable={false}>
      <input type="checkbox" {...inputProps}/>
      {filter.name}
    </Label>
  )
}

const Label = styled.label`
  display: block;
  margin-left: 20px;
  margin-top: 10px;
`;
