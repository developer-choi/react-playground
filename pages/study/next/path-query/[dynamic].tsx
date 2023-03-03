import React from 'react';
import type {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import {useLogWhenRendering} from '@util/extend/test';

// URL: http://localhost:3000/study/next/path-query/path-value?query-key=query-value
interface PageProp {
  paramsInContext: any;
  queryInContext: any;
}

export default function Page({queryInContext, paramsInContext}: PageProp) {
  const {query} = useRouter();

  /**
   * useRouter().query,
   * context.query
   * 둘 다 path값이 같이 나온다.
   */
  useLogWhenRendering(query, queryInContext, paramsInContext);

  return null;
}

export const getServerSideProps: GetServerSideProps<PageProp> = async ({params, query}) => {
  return {
    props: {
      paramsInContext: params,
      queryInContext: query
    }
  };
};
