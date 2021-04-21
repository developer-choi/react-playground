import React from 'react';
import Head from 'next/head';
import {GetServerSideProps} from 'next';
import MainLayout from '@components/layouts/MainLayout';

/**
 * The type of params must be an optional string array.
 * Because, if there is no param, there is an empty object.
 */
type ParamType = {
  id?: string[];
};

interface PageProp {
  nickNames: string[];
}

export const getServerSideProps: GetServerSideProps<PageProp, ParamType> = async ({params}) => {
  //You can make a type assertion such as allocating to an empty array by the type of the above params.
  const {id = []} = params as ParamType;
  return {
    props: {
      nickNames: id
    }
  };
};

export default function SspOptionalParamsPage({nickNames}: PageProp) {
  console.log(nickNames);
  return (
      <>
        <Head>
          <title>ssp-optional-params</title>
        </Head>
        <MainLayout>
          {nickNames}
        </MainLayout>
      </>
  );
}
