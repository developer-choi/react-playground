import React from 'react';
import type {GetStaticPaths, GetStaticProps} from 'next';

interface PageProp {
  data: string;
}

export default function Page({data}: PageProp) {
  return (
    <div>data = {data}</div>
  );
}

type ParamType = {
  dynamic: string;
};

export const getStaticPaths: GetStaticPaths<ParamType> = async () => {
  return {
    fallback: false,
    paths: [{params: {dynamic: 'some1'}}, {params: {dynamic: 'some2'}}]
  };
};

export const getStaticProps: GetStaticProps<PageProp, ParamType> = async ({params}) => {
  return {
    props: {
      data: params?.dynamic as string
    }
  };
}
