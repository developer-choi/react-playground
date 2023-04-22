import FilterController from '@component/filter/FilterController';
import AppliedFilterResultList from '@component/filter/AppliedFilterResultList';
import FilteredProductList from '@component/filter/FilteredProductList';
import React from 'react';
import type {ProductListPageParam} from '@type/services/filter';

interface ProductListPageProp {
  productListPageParam: ProductListPageParam;
}

export default function ProductListPage({productListPageParam}: ProductListPageProp) {
  return (
    <>
      <FilterController productListPageParam={productListPageParam}/>
      <AppliedFilterResultList productListPageParam={productListPageParam}/>
      <FilteredProductList/>
    </>
  );
}
