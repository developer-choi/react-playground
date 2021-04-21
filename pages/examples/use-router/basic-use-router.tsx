import React from 'react';
import Head from 'next/head';
import MainLayout from '../../../src/components/layouts/MainLayout';
import UseRouterResult from '../../../src/components/molecules/UseRouterResult';

export default function BasicUseRouterPage() {
  
  return (
      <>
        <Head>
          <title>basic-use-router</title>
        </Head>
        <MainLayout>
          <UseRouterResult/>
        </MainLayout>
      </>
  );
}
