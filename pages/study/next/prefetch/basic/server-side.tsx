import React from 'react';
import type {GetServerSideProps} from 'next';
import {timeoutPromise} from '@util/extend/test';

export default function Page() {
  return (
    <div>Server Side Rendering</div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await timeoutPromise(TTFB_TIMEOUT);
  return {
    props: {
      data: "server side data"
    }
  };
};

const TTFB_TIMEOUT = 3000;