import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {FormProvider, SubmitHandler, useForm, useFormContext} from 'react-hook-form';
import styled from 'styled-components';
import {useForceReRender} from '@util/custom-hooks/useForceReRender';
import {EMPTY_ARRAY} from '@util/extend/array';
import Button from '@component/atom/button/Button';
import {resetObject} from '@util/extend/object';

export default function Page() {
  const methods = useForm();
  const [filterResultList, setFilterResultList] = useState<FilterResult[]>([]);

  const deleteFilterResult = useCallback((pk: number) => {
    setFilterResultList(prevState => prevState.filter(prev => prev.pk !== pk));
  }, []);

  const onSubmit: SubmitHandler<any> = useCallback(data => {
    const selectedNames = Object.entries(data).reduce((a, b) => {
      if (b[1] === true) {
        return a.concat(b[0] as string);
      } else {
        return a;
      }
    }, [] as string[]);

    const categoryPks = categoryConverter.namesToPks(selectedNames);

    //pk들만 모아서 서버로 보내고
    const result = removeChildren(categoryPks, totalCategories);

    const categoryRecord = parseCategoryRecord(flatCategories(totalCategories));

    //받아뒀던 카테고리로 뒤져서 이름 다시 맵핑
    setFilterResultList(result.map(pk => ({
      pk,
      name: categoryRecord[pk].name
    })));
  }, []);

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

  useEffect(() => {
    reset();

    const checkedCategoryIds = filterResultList.map(({pk}) => pk);

    //1. 체크됬던 부모들의 직계자식을 모아놓고,
    const flatedCategories = flatCategories(totalCategories);
    const firstCheckedChildren = flatedCategories.filter(category => checkedCategoryIds.includes(category.pk)).map(({childrens}) => childrens ?? []).flat();

    //2. 체크됬던 직계자식들의 자식의자식의자식들까지 모두 루프돌기위해 또 펼칩니다.
    const allCheckedChildren = flatCategories(firstCheckedChildren);

    //필터를 적용할 떄는 부모 카테고리만 남기기 때문에, 먼저 부모 카테고리부터 다시 체크시킵니다.
    //체크됬던 부모의 모든 자식카테고리들입니다.
    checkedCategoryIds.map((pk => categoryConverter.pkToName(pk))).forEach(checkboxName => {
      methods.setValue(checkboxName, true);
    });

    //부모가 체크됬으면 자식도 다시 다 체크시킵니다.
    allCheckedChildren.map(({pk}) => categoryConverter.pkToName(pk)).forEach(checkboxName => {
      methods.setValue(checkboxName, true);
    });
  }, [filterResultList, methods, reset]);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {totalCategories.map(category => (
          <CategoryComponent key={category.name} category={category}/>
        ))}
        <Button type="button" className="gray" onClick={reset}>초기화</Button>
        <Button>제출</Button>
      </Form>
      {filterResultList.length === 0 ? null : (
        <FilterResultWrap>
          <span>적용된 필터 목록 : </span>
          {filterResultList.map(({pk, name}) => (
            <FilterResultButton key={pk} type="button" onClick={() => deleteFilterResult(pk)}>{name} (X)</FilterResultButton>
          ))}
        </FilterResultWrap>
      )}
    </FormProvider>
  );
}

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

interface FilterResult {
  pk: number;
  name: string;
}

function parseCategoryRecord(categories: Category[]) {
  return categories.reduce((a, b) => {
    // eslint-disable-next-line no-param-reassign
    a[b.pk] = b;
    return a;
  }, {} as Record<number, Category>);
}

function flatCategories(categoreis: Category[]): Category[] {
  return categoreis.reduce((a, b) => {
    if (b.childrens) {
      return a.concat(b).concat(flatCategories(b.childrens));
    }

    return a.concat(b);
  }, [] as Category[]);
}

function removeChildren(selectedCategoriesPk: number[], originalCategories: Category[]): number[] {
  const originalHaveChildrenCategories = flatCategories(originalCategories).filter(({childrens}) => childrens.length > 0);

  const removeTargets = originalHaveChildrenCategories.reduce((a, b) => {
    if (b.childrens.every(original => selectedCategoriesPk.includes(original.pk))) {
      return a.concat(b.childrens);
    }

    return a;
  }, [] as Category[]);

  return selectedCategoriesPk.filter(selectedPk => !removeTargets.find(target => target.pk === selectedPk));
}

function CategoryComponent({category, parentData}: {category: Category, parentData?: Data}) {
  const {register, watch, setValue, getValues} = useFormContext();

  const thisName = categoryConverter.itemToName(category);
  const thisChecked = watch(thisName);
  const childrenNames = getAllChildrens(category).map(category => categoryConverter.itemToName(category)) ?? EMPTY_ARRAY;

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
      {category.childrens?.map(children => (
        <CategoryComponent key={children.name} category={children} parentData={thisData}/>
      ))}
    </CategoryWrap>
  );
}

class FormNameConverter<T> {
  private readonly replacePrefix: string;
  private readonly pkExtractor: (value: T) => number;

  constructor(prefix: string, pkExtractor: (value: T) => number) {
    this.replacePrefix = prefix + '-';
    this.pkExtractor = pkExtractor;
  }

  itemToName(value: T) {
    const pk = this.pkExtractor(value);
    return this.pkToName(pk);
  }

  pkToName(pk: number) {
    return `${this.replacePrefix}${pk}`;
  }

  private nameToPk(name: string) {
    return Number(name.replace(`${this.replacePrefix}`, ''));
  }

  namesToPks(names: string[]): number[] {
    return names.map(name => this.nameToPk(name)).filter(pk => !Number.isNaN(pk));
  }
}

const categoryConverter = new FormNameConverter('checked-list-category', (category: Category) => category.pk);

function getAllChildrens({childrens}: Category): Category[] {
  if (childrens.length === 0) {
    return [];
  }

  return childrens.concat(childrens.map(children => getAllChildrens(children)).flat());
}

interface Data {
  name: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class Category {
  pk: number;
  name: string;
  childrens: Category[];

  constructor(pk: number, name: string, childrens?: Category[]) {
    this.pk = pk;
    this.name = name;
    this.childrens = childrens ?? [];
  }
}

const totBags = [
  new Category(3, '아디다스토트백', []),
  new Category(4, '나이키토트백', [])
];

const bagCategories = [
  new Category(1, '토트백', totBags),
  new Category(2, '벨트백', [])
];

const walletCategories = [
  new Category(11, '장지갑', []),
  new Category(12, '카드지갑', [])
];

const clothesCategories = [
  new Category(101, '아우터', []),
  new Category(102, '스커트', [])
];

const shoesCategories = [
  new Category(1001, '하이힐', []),
  new Category(1002, '부츠', [])
];

const totalCategories = [
  new Category(0, '가방', bagCategories),
  new Category(10, '지갑', walletCategories),
  new Category(100, '의류', clothesCategories),
  new Category(1000, '슈즈', shoesCategories)
];

const Form = styled.form`
  padding: 10px;
`;

const CategoryWrap = styled.label`
  display: block;
  margin-left: 20px;
  margin-top: 10px;
`;
