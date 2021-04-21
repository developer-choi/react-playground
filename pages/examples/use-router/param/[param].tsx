import React from 'react';
import Head from 'next/head';
import UseRouterResult from '../../../../src/components/molecules/UseRouterResult';
import MainLayout from '../../../../src/components/layouts/MainLayout';

export default function ParamPage() {
  
  return (
      <>
        <Head>
          <title>[param]</title>
        </Head>
        <MainLayout>
          <UseRouterResult/>
        </MainLayout>
      </>
  );
}
