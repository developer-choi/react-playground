import React, {useMemo} from 'react';
import type {GetServerSideProps} from 'next';
import {validateFilterQueryString} from '@util/services/product-filter/filter-query-string';
import ProductListPage from '@component/filter/ProductListPage';
import type {ProductListPageParam} from '@type/services/filter';
import {ProductListPageParamProvider} from '@util/services/product-filter/filter-common';

interface PageProp {
  pageInQuery: number;
}

// URL: http://localhost:3000/study/rhf/product-filter?page=1
export default function Page({pageInQuery}: PageProp) {
  const productListPageParam: ProductListPageParam = useMemo(() => {
    return {
      page: pageInQuery,
      type: 'brand', //브랜드 상품리스트페이지라고 가정
      uniqueKey: 1
    }
  }, [pageInQuery]);

  return (
    <ProductListPageParamProvider value={productListPageParam}>
      <ProductListPage/>
    </ProductListPageParamProvider>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp> = async ({query}) => {
  try {
    const {page} = validateFilterQueryString(query);

    return {
      props: {
        pageInQuery: page
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/study/rhf/product-filter?page=1',
        permanent: false
      }
    };
  }
};
