import {useFormContext} from 'react-hook-form';
import {removeDuplicatedItems} from '@util/extend/array';
import React, {ChangeEvent, useCallback} from 'react';
import styled from 'styled-components';
import type {Category} from '@type/response-sub/category-sub';
import type {FilterFormData} from '@pages/examples/libraries/rhf/nested';
import {flatDeepCategoryList} from '@util/services/category-filter';

export interface CategoryCheckboxProp {
  category: Category;
  onChangeOfParent?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CategoryCheckbox({category, onChangeOfParent}: CategoryCheckboxProp) {
  const {register, setValue, getValues} = useFormContext<FilterFormData>();

  const thisPk = String(category.pk);
  //this category의 모든 후손들 (자식, 자식의자식 포함)
  const allChildrenPkList = flatDeepCategoryList(category.children).map(({pk}) => String(pk));

  const onChangeNested = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (allChildrenPkList.length > 0) {
      const previousCategoryPkList = getValues('categoryPkList');
      const allChilrenAreChecked = allChildrenPkList.every(childrenPk => previousCategoryPkList.includes(childrenPk));

      if (allChilrenAreChecked) {
        setValue('categoryPkList', removeDuplicatedItems(previousCategoryPkList.concat(thisPk)));
      } else {
        setValue('categoryPkList', previousCategoryPkList.filter(previousPk => previousPk !== thisPk));
      }
    }

    onChangeOfParent?.(event);
  }, [allChildrenPkList, getValues, onChangeOfParent, setValue, thisPk]);

  const {onChange: onChangeNative} = register('categoryPkList');

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeNative(event).then();
    const previousCategoryPkList = getValues('categoryPkList');

    if (event.target.checked) {
      setValue('categoryPkList', removeDuplicatedItems(previousCategoryPkList.concat(allChildrenPkList)));
    } else {
      setValue('categoryPkList', previousCategoryPkList.filter(previousPk => !allChildrenPkList.includes(previousPk)));
    }

    onChangeNested(event);
  }, [allChildrenPkList, getValues, onChangeNative, onChangeNested, setValue]);

  return (
    <CategoryWrap draggable={false}>
      <input type="checkbox" {...register('categoryPkList')} onChange={onChange} value={thisPk}/>
      {category.name}
      {category.children?.map(children => (
        <CategoryCheckbox key={children.pk} category={children} onChangeOfParent={onChangeNested}/>
      ))}
    </CategoryWrap>
  );
}

const CategoryWrap = styled.label`
  display: block;
  margin-left: 20px;
  margin-top: 10px;
`;
