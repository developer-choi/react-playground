import React, {useCallback, useState} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import styled from 'styled-components';
import Button from '@component/atom/element/Button';
import {
  categoryPkListToFilterResultList,
  FilterResult,
  flatDeepCategoryList,
  parseFilterResultList,
  useFilterRecord
} from '@util/services/category-filter';
import type {Category} from '@type/response-sub/category-sub';
import type {GetServerSideProps} from 'next';
import CategoryApi from '@api/CategoryApi';
import CategoryCheckbox from '@component/molecules/CategoryCheckbox';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import {useLogWhenRendering} from '@util/extend/test';

interface PageProp {
  categoryList: Category[];
}

export default function Page({categoryList}: PageProp) {
  const methods = useForm<FilterFormData>({
    defaultValues: DEFAULT_VALUE
  });

  const {filterRecord, appendCategoryRecord} = useFilterRecord();
  const [filterResultList, setFilterResultList] = useState<FilterResult[]>([]);

  const getAllFilterResultList = useCallback((data: FilterFormData) => {
    const categoryFilterResultList = categoryPkListToFilterResultList(data.categoryPkList, categoryList);

    return {
      category: categoryFilterResultList
    };
  }, [categoryList]);

  const currentCheckedFilterList = getAllFilterResultList(methods.watch());

  const onSubmit: SubmitHandler<FilterFormData> = useCallback(data => {
    const {category} = getAllFilterResultList(data);
    setFilterResultList(category);
  }, [getAllFilterResultList]);

  const reset = useCallback(() => {
    methods.reset(DEFAULT_VALUE);
  }, [methods]);

  const updateFilterResultToCategory = useCallback((filterResultList: FilterResult[]) => {
    const parentCategoryIds = filterResultList.filter(({type}) => type === 'category').map(({pk}) => pk);

    //체크됬던 부모의 모든 자식의 자식을 얻기위한 과정

    //1. 체크됬던 부모들의 직계자식을 모아놓고,
    const directChildrenOfParent = flatDeepCategoryList(categoryList).filter(category => parentCategoryIds.includes(category.pk)).map(({children}) => children ?? []).flat();

    //2. 체크됬던 직계자식들의 자식의자식의자식들까지 모두 루프돌기위해 또 펼칩니다.
    const allChildrenOfCheckedParent = flatDeepCategoryList(directChildrenOfParent);

    const allCategoryIds = allChildrenOfCheckedParent.map(({pk}) => pk);
    methods.setValue('categoryPkList', parentCategoryIds.concat(allCategoryIds).map(value => String(value)));
  }, [categoryList, methods]);

  const deleteFilterResult = useCallback((pk: number) => {
    setFilterResultList(prevState => {
      const nextState = prevState.filter(prev => prev.pk !== pk);

      const {category: categoryFilterResultList} = parseFilterResultList(nextState);
      updateFilterResultToCategory(categoryFilterResultList);

      return nextState;
    });
  }, [updateFilterResultToCategory]);

  useLogWhenRendering('watch', methods.watch(), filterRecord);

  return (
    <FormProvider {...methods}>
      <div>
        체크된 필터 목록:
        <CheckedFilter>{currentCheckedFilterList.category.map(({pk, type}) => filterRecord[type][pk].name).join(', ')}</CheckedFilter>
      </div>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {categoryList.map(category => (
          <CategoryCheckbox key={category.pk} category={category} appendCategoryRecord={appendCategoryRecord}/>
        ))}
        <Button type="button" className="gray" onClick={reset}>초기화</Button>
        <Button>제출</Button>
      </Form>
      {filterResultList.length === 0 ? null : (
        <FilterResultWrap>
          <span>적용된 필터 목록 : </span>
          {filterResultList.map(({pk, type}) => (
            <FilterResultButton key={pk} type="button" onClick={() => deleteFilterResult(pk)}>{filterRecord[type][pk].name} (X)</FilterResultButton>
          ))}
        </FilterResultWrap>
      )}
    </FormProvider>
  );
}

export interface FilterFormData {
  categoryPkList: string[];
}

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  const api = new CategoryApi();

  try {
    const {data: {list: categoryList}} = await api.getList();

    return {
      props: {
        categoryList,
      }
    };
  } catch (error) {
    return handleServerSideError(error);
  }
};

const DEFAULT_VALUE: FilterFormData = {
  categoryPkList: []
};

const FilterResultWrap = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const FilterResultButton = styled.button`
  padding: 5px 12px;
  font-size: 12px;
  background: lightblue;
`;

const Form = styled.form`
  padding: 10px;
  display: inline-block;
`;

const CheckedFilter = styled.span`
  color: orange;
  font-size: 14px;
  margin-left: 5px;
`;
