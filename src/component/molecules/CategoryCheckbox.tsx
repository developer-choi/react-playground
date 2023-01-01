import {useFormContext} from 'react-hook-form';
import {removeDuplicatedItems} from '@util/extend/array';
import React, {ChangeEvent, useCallback} from 'react';
import styled from 'styled-components';
import type {Category} from '@type/response-sub/category-sub';
import type {FilterFormData} from '@pages/libraries/rhf/nested';
import {flatDeepCategoryList} from '@util/services/category-filter';
import type {FilterRecordResult} from '@util/custom-hooks/useFilterRecord';

export interface CategoryCheckboxProp {
  category: Category;
  onChangeOfParent?: (event: ChangeEvent<HTMLInputElement>) => void;
  appendCategoryRecord: FilterRecordResult['appendCategoryRecord'];
}

export default function CategoryCheckbox({category, onChangeOfParent, appendCategoryRecord}: CategoryCheckboxProp) {
  const {register, setValue, getValues} = useFormContext<FilterFormData>();

  const thisPk = String(category.pk);

  //this category의 모든 후손들 (자식, 자식의자식 포함)
  const allChildren = flatDeepCategoryList(category.children);
  const allChildrenPkList = allChildren.map(({pk}) => String(pk));

  const onChangeNested = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (allChildren.length > 0) {
      const previousCategoryPkList = getValues('categoryPkList');
      const allChilrenAreChecked = allChildren.every(({pk}) => previousCategoryPkList.includes(String(pk)));

      if (allChilrenAreChecked) {
        setValue('categoryPkList', removeDuplicatedItems(previousCategoryPkList.concat(thisPk)));
        appendCategoryRecord([category]);

      } else {
        setValue('categoryPkList', previousCategoryPkList.filter(previousPk => previousPk !== thisPk));
      }
    }

    onChangeOfParent?.(event);
  }, [allChildren, appendCategoryRecord, category, getValues, onChangeOfParent, setValue, thisPk]);

  const {onChange: onChangeNative} = register('categoryPkList');

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeNative(event).then();
    const previousCategoryPkList = getValues('categoryPkList');

    if (event.target.checked) {
      setValue('categoryPkList', removeDuplicatedItems(previousCategoryPkList.concat(allChildrenPkList)));
      appendCategoryRecord(allChildren.concat(category));
    } else {
      setValue('categoryPkList', previousCategoryPkList.filter(previousPk => !allChildrenPkList.includes(previousPk)));
    }

    onChangeNested(event);
  }, [allChildren, allChildrenPkList, appendCategoryRecord, category, getValues, onChangeNative, onChangeNested, setValue]);

  return (
    <CategoryWrap draggable={false}>
      <input type="checkbox" {...register('categoryPkList')} onChange={onChange} value={thisPk}/>
      {category.name}
      {category.children?.map(children => (
        <CategoryCheckbox key={children.pk} category={children} onChangeOfParent={onChangeNested} appendCategoryRecord={appendCategoryRecord}/>
      ))}
    </CategoryWrap>
  );
}

const CategoryWrap = styled.label`
  display: block;
  margin-left: 20px;
  margin-top: 10px;
`;
