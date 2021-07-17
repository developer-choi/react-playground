import React from 'react';
import Head from 'next/head';
import {GetStaticPaths, GetStaticProps} from 'next';
import PropertyText from '@components/atom/PropertyText';

type ParamType = {
  id?: string[];
};

interface PageProp {
  genre?: string;
}

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
