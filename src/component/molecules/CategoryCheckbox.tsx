import {useFormContext} from 'react-hook-form';
import {EMPTY_ARRAY} from '@util/extend/array';
import React, {ChangeEvent, useCallback, useMemo} from 'react';
import {categoryConverter} from '@util/services/category-filter';
import styled from 'styled-components';
import type {Category} from '@type/response-sub/category-sub';

export default function CategoryCheckbox({category, parentData}: {category: Category, parentData?: Data}) {
  const {register, watch, setValue, getValues} = useFormContext();

  const thisName = categoryConverter.itemToName(category);
  const thisChecked = watch(thisName);
  const childrenNames = getAllChildren(category).map(category => categoryConverter.itemToName(category)) ?? EMPTY_ARRAY;

  const thisData = useMemo(() => ({
    name: thisName,
    checked: thisChecked,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      if (childrenNames.length > 0) {
        const allChildrenChecked = childrenNames.every(name => getValues(name));
        setValue(thisName, allChildrenChecked);
      }

      parentData?.onChange(event);
    }
  }), [thisName, thisChecked, childrenNames, parentData, setValue, getValues]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    childrenNames.forEach(name => {
      setValue(name, event.target.checked);
    });

    thisData.onChange(event);
  }, [childrenNames, setValue, thisData]);

  return (
    <CategoryWrap draggable={false}>
      <input type="checkbox" {...register(thisName, {onChange})}/>
      {category.name}
      {category.children?.map(children => (
        <CategoryCheckbox key={children.name} category={children} parentData={thisData}/>
      ))}
    </CategoryWrap>
  );
}

const CategoryWrap = styled.label`
  display: block;
  margin-left: 20px;
  margin-top: 10px;
`;

function getAllChildren({children}: Category): Category[] {
  if (children.length === 0) {
    return [];
  }

  return children.concat(children.map(children => getAllChildren(children)).flat());
}

interface Data {
  name: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
