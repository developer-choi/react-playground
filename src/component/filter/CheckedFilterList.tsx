import React from 'react';
import styled from 'styled-components';
import {useCurrentCheckedFilterResultList} from '@util/services/product-filter/filter-form';
import type {ProductListPageParam} from '@util/services/product-filter/filter-common';

interface CheckedFilterListProp {
  productListPageParam: ProductListPageParam;
}

export default function CheckedFilterList({productListPageParam}: CheckedFilterListProp) {
  const currentCheckedFilterList = useCurrentCheckedFilterResultList(productListPageParam);

  return (
    <div>
      체크된 필터 목록:
      {currentCheckedFilterList.map(({pk, type, name}) => (
        <CheckedFilter key={`${type}-${pk}`}>{name}</CheckedFilter>
      ))}
    </div>
  );
}

const CheckedFilter = styled.span`
  color: orange;
  font-size: 14px;
  margin-left: 5px;
`;
