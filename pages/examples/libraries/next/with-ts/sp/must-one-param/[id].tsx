import React from 'react';
import type {GetStaticPaths, GetStaticProps} from 'next';
import PropertyText from '@component/atom/PropertyText';

interface PageProp {
  someData: number;
}

export default function SpMustOneParamPage({someData} : PageProp) {
  console.log(someData);
  return (
      <>
        <PropertyText>allow params = {ALLOW_PARAMS.join(', ')}</PropertyText>
        <PropertyText>someData = {someData}</PropertyText>
      </>
  );
}

const ALLOW_PARAMS = ['hello1', 'hello2', 'hello3'];

type ParamType = {
  id: string;
};

export const getStaticPaths: GetStaticPaths<ParamType> = async () => {
  return {
    paths: [
      {params: {id: ALLOW_PARAMS[0]}},
      {params: {id: ALLOW_PARAMS[1]}},
      {params: {id: ALLOW_PARAMS[2]}}
    ],
    /**
     * I'm not sure about the fallback yet.
     * Anyway, if it is set to false, it will show 404 page if it is not the params allowed by me.
     */
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<PageProp, ParamType> = async ({params}) => {
  const {id} = params as ParamType;
  return {
    props: {
      someData: id.length
    }
  };
};
