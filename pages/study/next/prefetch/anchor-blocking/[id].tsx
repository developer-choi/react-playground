import React from 'react';
import {timeoutPromise} from '@util/extend/test';
import type {GetStaticPaths, GetStaticProps} from 'next';

// URL: http://localhost:3000/study/next/prefetch/anchor-blocking/start
export default function Page() {
  return (
    <div>
      페이지 도착
    </div>
  );
}

type ParamType = {
  id: string;
}

export const getStaticPaths: GetStaticPaths<ParamType> = async () => {
  return {
    fallback: 'blocking',
    paths: []
  };
};

export const getStaticProps: GetStaticProps<{}, ParamType> = async () => {
  await timeoutPromise(10000);
  return {
    props: {
    },
    revalidate: 1
  };
}
