import React from 'react';
import Head from 'next/head';
import {GetServerSideProps} from 'next';
import {getYyyymmddOrDefault} from '../../src/utils/extend/query-string';

interface PageProp {
  yyyymmdd: string;
}

export const getServerSideProps: GetServerSideProps<PageProp> = async ({query}) => {
  return {
    props: {
      yyyymmdd: getYyyymmddOrDefault(query.date)
    }
  };
};

export default function QueryStringPage({yyyymmdd}: PageProp) {
  
  return (
      <>
        <Head>
          <title>querystring</title>
        </Head>
        <div>
          yyyymmdd={yyyymmdd}
        </div>
      </>
  );
}
