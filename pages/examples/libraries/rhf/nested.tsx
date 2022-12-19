import React, {ChangeEvent, useCallback, useEffect, useMemo} from 'react';
import {FormProvider, SubmitHandler, useForm, useFormContext} from 'react-hook-form';
import styled from 'styled-components';
import {useForceReRender} from '@util/custom-hooks/useForceReRender';
import {EMPTY_ARRAY} from '@util/extend/array';
import Button from '@component/atom/button/Button';
import {resetObject} from '@util/extend/object';

export default function Page() {
  const methods = useForm();

  const onSubmit: SubmitHandler<any> = useCallback(() => {
    const selectedNames = Object.entries(methods.watch()).reduce((a, b) => {
      if (b[1] === true) {
        return a.concat(b[0] as string);
      } else {
        return a;
      }
    }, [] as string[]);

    const categoryPks = categoryConverter.namesToPks(selectedNames);
    console.log('result', removeChildren(categoryPks, totalCategories));
  }, [methods]);

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

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {totalCategories.map(category => (
          <CategoryComponent key={category.name} category={category}/>
        ))}
        <Button type="button" className="gray" onClick={reset}>초기화</Button>
        <Button>제출</Button>
      </Form>
    </FormProvider>
  );
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

  const thisName = categoryConverter.pkToName(category);
  const thisChecked = watch(thisName);

  const childrenNames = getAllChildrens(category).map(category => categoryConverter.pkToName(category)) ?? EMPTY_ARRAY;

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

  pkToName(value: T) {
    const pk = this.pkExtractor(value);
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
