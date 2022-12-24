import React, {useCallback, useEffect, useState} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import styled from 'styled-components';
import {useForceReRender} from '@util/custom-hooks/useForceReRender';
import Button from '@component/atom/button/Button';
import {resetObject} from '@util/extend/object';
import {
  categoryConverter,
  categoryNamesToFilterResultList,
  FilterRecord,
  FilterResult,
  flatCategories,
  parseCategoryRecord,
  parseFilterResultList
} from '@util/services/category-filter';
import type {Category} from '@type/response-sub/category-sub';
import type {GetServerSideProps} from 'next';
import CategoryApi from '@api/CategoryApi';
import CategoryCheckbox from '@component/molecules/CategoryCheckbox';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';

interface PageProp {
  categoryList: Category[];
  filterRecord: FilterRecord;
}

export default function Page({filterRecord, categoryList}: PageProp) {
  const methods = useForm();
  const [filterResultList, setFilterResultList] = useState<FilterResult[]>([]);

  const deleteFilterResult = useCallback((pk: number) => {
    setFilterResultList(prevState => prevState.filter(prev => prev.pk !== pk));
  }, []);

  const getAllFilterResultList = useCallback((data: any) => {
    const selectedNames = Object.entries(data).reduce((a, b) => {
      if (b[1] === true) {
        return a.concat(b[0] as string);
      } else {
        return a;
      }
    }, [] as string[]);

    const categoryFilterResultList = categoryNamesToFilterResultList(selectedNames, categoryList);

    return {
      category: categoryFilterResultList
    };
  }, [categoryList]);

  const currentCheckedFilterList = getAllFilterResultList(methods.watch());

  const onSubmit: SubmitHandler<any> = useCallback(data => {
    const {category} = getAllFilterResultList(data);
    setFilterResultList(category);
  }, [getAllFilterResultList]);

  //최초렌더링할 때, 강제로 1번만 리렌더링을 하여 모든 데이터의 값에 undefined가 아닌 false가 들어가도록 했습니다.
  const forceReRender = useForceReRender();

  useEffect(() => {
    forceReRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useCallback(() => {
    const values = methods.getValues();
    methods.reset(resetObject(values));
  }, [methods]);

  const updateFilterResultToCategory = useCallback((filterResultList: FilterResult[]) => {
    const checkedCategoryIds = filterResultList.map(({pk}) => pk);

    //1. 체크됬던 부모들의 직계자식을 모아놓고,
    const flatedCategories = flatCategories(categoryList);
    const firstCheckedChildren = flatedCategories.filter(category => checkedCategoryIds.includes(category.pk)).map(({children}) => children ?? []).flat();

    //2. 체크됬던 직계자식들의 자식의자식의자식들까지 모두 루프돌기위해 또 펼칩니다.
    const allCheckedChildren = flatCategories(firstCheckedChildren);

    //필터를 적용할 떄는 부모 카테고리만 남기기 때문에, 먼저 부모 카테고리부터 다시 체크시킵니다.
    checkedCategoryIds.map((pk => categoryConverter.pkToName(pk))).forEach(checkboxName => {
      methods.setValue(checkboxName, true);
    });

    //부모가 체크됬으면 자식도 다시 다 체크시킵니다.
    allCheckedChildren.map(({pk}) => categoryConverter.pkToName(pk)).forEach(checkboxName => {
      methods.setValue(checkboxName, true);
    });
  }, [categoryList, methods]);

  useEffect(() => {
    reset();

    const {category: categoryFilterResultList} = parseFilterResultList(filterResultList);

    updateFilterResultToCategory(categoryFilterResultList);
  }, [categoryList, filterResultList, methods, reset, updateFilterResultToCategory]);

  return (
    <FormProvider {...methods}>
      {currentCheckedFilterList.category.length === 0 ? null : (
        <div>
          체크된 필터 목록:
          <CheckedFilter>{currentCheckedFilterList.category.map(({pk, type}) => filterRecord[type][pk].name).join(', ')}</CheckedFilter>
        </div>
      )}
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {categoryList.map(category => (
          <CategoryCheckbox key={category.name} category={category}/>
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

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  const api = new CategoryApi();

  try {
    const {data: {list: categoryList}} = await api.getList();
    const categoryRecord = parseCategoryRecord(flatCategories(categoryList));

    return {
      props: {
        categoryList,
        filterRecord: {
          category: categoryRecord
        }
      }
    };
  } catch (error) {
    return handleServerSideError(error);
  }
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
`;

const CheckedFilter = styled.span`
  color: orange;
  font-size: 14px;
  margin-left: 5px;
`;