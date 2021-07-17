import React from 'react';
import Head from 'next/head';
import UseRouterResult from '../../../../src/components/molecules/UseRouterResult';

export default function CatchAllPage () {
  
  return (
      <>
        <Head>
          <title>[...param]</title>
        </Head>
        <UseRouterResult/>
      </>
  );
}
