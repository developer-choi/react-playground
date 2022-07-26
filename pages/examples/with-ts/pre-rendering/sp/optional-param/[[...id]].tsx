import React from 'react';
import Head from 'next/head';
import type {GetStaticPaths, GetStaticProps} from 'next';
import PropertyText from '@component/atom/PropertyText';

interface PageProp {
  genre?: string;
}

export default function SpOptionalParamPage({genre}: PageProp) {
  return (
      <>
        <Head>
          <title>sp-optional-param</title>
        </Head>
        <PropertyText>genre = {genre}</PropertyText>
      </>
  );
}

type ParamType = {
  id?: string[];
};

export const getStaticPaths: GetStaticPaths<ParamType> = async () => {
  return {
    paths: [
      {params: {id: ['ballad']}},
      {params: {id: ['rock']}},
      {params: {id: undefined}}
    ],
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<PageProp, ParamType> = async ({params}) => {
  const {id = []} = params as ParamType;
  return {
    props: {
      genre: id[0] ?? 'DEFAULT_GENRE'
    }
  };
};
