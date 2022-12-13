import Button from '@component/atom/button/Button';
import React, {ChangeEvent, useCallback, useEffect, useMemo} from 'react';
import {FormProvider, SubmitHandler, useForm, useFormContext} from 'react-hook-form';
import styled from 'styled-components';
import {useForceReRender} from '@util/custom-hooks/useForceReRender';
import {EMPTY_ARRAY} from '@util/extend/array';

export default function Page() {
  const methods = useForm({
    defaultValues: {
      [SEND_CATEGORIES]: []
    }
  });


  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  //최초렌더링할 때, 강제로 1번만 리렌더링을 하여 모든 데이터의 값에 undefined가 아닌 false가 들어가도록 했습니다.
  const forceReRender = useForceReRender();

  useEffect(() => {
    forceReRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {totalCategories.map(category => (
          <CategoryComponent key={category.name} category={category}/>
        ))}
        <Button type="submit">제출</Button>
      </Form>
    </FormProvider>
  );
}

const SEND_CATEGORIES = 'send-categories';

function CategoryComponent({category, parentData}: {category: Category, parentData?: Data}) {
  const {register, watch, setValue, getValues} = useFormContext();

  const thisName = categoryToCheckedListName(category);
  const thisChecked = watch(thisName);

  const childrenNames = getAllChildrens(category).map(category => categoryToCheckedListName(category)) ?? EMPTY_ARRAY;

  const setSendCategoryIds = useCallback((checked: boolean) => {
    const value = getValues(SEND_CATEGORIES) as Category[];
    const result = checked ? value.concat(category) : value.filter(prev => prev.pk !== category.pk);
    setValue(SEND_CATEGORIES, result);
  }, [category, getValues, setValue]);

  const removeChildCategoryIds = useCallback(() => {
    const value = getValues(SEND_CATEGORIES) as Category[];
    const childPks = childrenNames.map(name => checkedListNameToCategoryId(name));
    setValue(SEND_CATEGORIES, value.filter(prev => !childPks.includes(getValues(prev.pk))));
  }, [childrenNames, getValues, setValue]);

  const thisData = useMemo(() => ({
    name: thisName,
    checked: thisChecked,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      if (childrenNames.length > 0) {
        const allChildrenChecked = childrenNames.every(name => getValues(name));
        setValue(thisName, allChildrenChecked);

        if (allChildrenChecked) {
          removeChildCategoryIds();
        }
      }

      parentData?.onChange(event);
    }
  }), [thisName, thisChecked, childrenNames, parentData, setValue, getValues, removeChildCategoryIds]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {checked} = event.target;

    childrenNames.forEach(name => {
      setValue(name, checked);
    });

    setSendCategoryIds(checked);

    thisData.onChange(event);
  }, [childrenNames, setSendCategoryIds, setValue, thisData]);

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

function categoryToCheckedListName({pk}: Category) {
  return `checked-list.${pk}`;
}

function checkedListNameToCategoryId(name: string) {
  return Number(name.replace('checked-list.', ''));
}

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
  pk: string;
  parentPk?: string;
  name: string;
  childrens: Category[];

  constructor(pk: string, name: string, childrens?: Category[], parentPk?: string) {
    this.pk = pk;
    this.name = name;
    this.childrens = childrens ?? [];
    this.parentPk = parentPk;
  }
}

const totBags = [
  new Category('bag-1-adidas', '아디다스토트백', [], 'bag-1'),
  new Category('bag-1-nike', '나이키토트백', [], 'bag-1')
];

const bagCategories = [
  new Category('bag-1', '토트백', totBags, 'bag'),
  new Category('bag-2', '벨트백', [], 'bag')
];

const walletCategories = [
  new Category('wallet-1', '장지갑', [], 'wallet'),
  new Category('wallet-2', '카드지갑', [], 'wallet')
];

const clothesCategories = [
  new Category('clothes-1', '아우터', [], 'clothes'),
  new Category('clothes-2', '스커트', [], 'clothes')
];

const shoesCategories = [
  new Category('shoes-1', '하이힐', [], 'shoes'),
  new Category('shoes-2', '부츠', [], 'shoes')
];

const totalCategories = [
  new Category('bag', '가방', bagCategories),
  new Category('wallet', '지갑', walletCategories),
  new Category('clothes', '의류', clothesCategories),
  new Category('shoes', '슈즈', shoesCategories)
];

const Form = styled.form`
  padding: 10px;
`;

const CategoryWrap = styled.label`
  display: block;
  margin-left: 20px;
  margin-top: 10px;
`;
