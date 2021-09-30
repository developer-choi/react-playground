import React from 'react';
import Head from 'next/head';
import UseRouterResult from '@component/molecules/UseRouterResult';

export default function ParamPage() {
  
  return (
      <>
        <Head>
          <title>[param]</title>
        </Head>
        <UseRouterResult/>
      </>
  );
}
