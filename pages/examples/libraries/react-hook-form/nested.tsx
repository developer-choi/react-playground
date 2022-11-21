import React from 'react';
import styled from 'styled-components';

export default function Page() {
  return (
    <>
      {totalCategories.map(category => (
        <CategoryComponent key={category.name} category={category}/>
      ))}
    </>
  );
}

function CategoryComponent({category}: {category: Category}) {
  return (
    <CategoryWrap>
      {category.name}
      {category.childrens?.map(children => (
        <CategoryComponent key={children.name} category={children}/>
      ))}
    </CategoryWrap>
  );
}

class Category {
  name: string;
  childrens: Category[];

  constructor(name: string, childrens?: Category[]) {
    this.name = name;
    this.childrens = childrens ?? [];
  }
}

const totBags = [
  new Category('아디다스토트백'),
  new Category('나이키토트백')
];

const bagCategories = [
  new Category('토트백', totBags),
  new Category('벨트백')
];

const walletCategories = [
  new Category('장지갑'),
  new Category('카드지갑')
];

const clothesCategories = [
  new Category('아우터'),
  new Category('스커트')
];

const shoesCategories = [
  new Category('하이힐'),
  new Category('부츠')
];

const totalCategories = [
  new Category("가방", bagCategories),
  new Category("지갑", walletCategories),
  new Category("의류", clothesCategories),
  new Category("슈즈", shoesCategories)
];

const CategoryWrap = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;
