import React from 'react';
import Head from 'next/head';
import UseRouterResult from '@components/molecules/UseRouterResult';
import MainLayout from '@components/layouts/MainLayout';

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
