import React from 'react';
import type {GetStaticPaths, GetStaticProps} from 'next';
import {timeoutPromise} from '@util/extend/test';

export default function Page() {
  return (
    <>
      Not Found Destination
    </>
  );
}

type ParamType = {
  id: string;
}

export const getStaticPaths: GetStaticPaths<ParamType> = async () => {
  return {
    fallback: 'blocking',
    paths: [{params: {id: '1'}}]
  };
};

export const getStaticProps: GetStaticProps<{}, ParamType> = async ({params}) => {
  if (Number(params?.id) === 1) {
    return {
      props: {
      }
    };
  }

  await timeoutPromise(2000);

  return {
    notFound: true
  };
}
