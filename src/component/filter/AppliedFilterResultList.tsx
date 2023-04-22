import React from 'react';
import styled from 'styled-components';
import {
  useCurrentAppliedFilterResultList,
  useFilterQueryString
} from '@util/services/product-filter/filter-query-string';
import type {ProductListPageParam} from '@util/services/product-filter/filter-common';

interface AppliedFilterResultListProp {
  productListPageParam: ProductListPageParam;
}

export default function AppliedFilterResultList({productListPageParam}: AppliedFilterResultListProp) {
  const itemList = useCurrentAppliedFilterResultList(productListPageParam);
  const {removeFilterInQueryString} = useFilterQueryString();

  return (
    <>
      {itemList.length === 0 ? null : (
        <FilterResultWrap>
          <span>적용된 필터 목록 : </span>
          {itemList.map((item) => (
            <FilterResultButton key={item.pk} type="button" onClick={() => removeFilterInQueryString(item)}>{item.name} (X)</FilterResultButton>
          ))}
        </FilterResultWrap>
      )}
    </>
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
