import FilterController from '@component/filter/FilterController';
import AppliedFilterResultList from '@component/filter/AppliedFilterResultList';
import FilteredProductList from '@component/filter/FilteredProductList';
import React from 'react';
import type {ProductListPageParam} from '@type/services/filter';
import {ProductListPageParamProvider} from '@util/services/product-filter/filter-common';

interface ProductListPageProp {
  productListPageParam: ProductListPageParam;
}

export default function ProductListPage({productListPageParam}: ProductListPageProp) {
  return (
    <ProductListPageParamProvider value={productListPageParam}>
      <FilterController/>
      <AppliedFilterResultList/>
      <FilteredProductList/>
    </ProductListPageParamProvider>
  );
}
