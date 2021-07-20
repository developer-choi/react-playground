import React from 'react';
import Head from 'next/head';
import type {GetServerSideProps} from 'next';
import PropertyText from '@components/atom/PropertyText';

/**
 * The type of params must be string.
 *
 * The type of params must be string.
 * Because, if there is no param, it will go to page 404,
 * if there is 1 param, this page will be answered,
 * and if there is more than 2, it will be answered with page 404.
 *
 * And unconditionally, the property name is id. Because, that's the file name.
 */
type ParamType = {
  id: string;
};

interface PageProp {
  userName: string;
}

export const getServerSideProps: GetServerSideProps<PageProp, ParamType> = async ({params}) => {
  //The type was determined as an assertion by the ParamType above.
  const {id} = params as ParamType;
  return {
    props: {
      userName: id
    }
  };
};

export default function MustOneParamPage({userName}: PageProp){
  console.log(userName);
  return (
      <>
        <Head>
          <title>must-one-param</title>
        </Head>
        <PropertyText>userName = {userName}</PropertyText>
      </>
  );
}
