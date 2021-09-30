import React from 'react';
import Head from 'next/head';
import type {GetStaticProps} from 'next';
import PropertyText from '@component/atom/PropertyText';

interface PageProp {
  userPkList: number[];
}

/**
 * The second Generic Parameter of GetStaticProps was not intentionally delivered.
 * This is because there is not necessarily a type of Param. (See the file name)
 * But type inference is parsedQuery | It is inferred as undefined.
 * However, it has nothing to do with me.
 * This is because it is a value that will not be used anyway.
 * Therefore, I will not write the code so that params is inferred as undefined.
 */
export const getStaticProps: GetStaticProps<PageProp> = async ({params}) => {
  return {
    props: {
      userPkList: [1, 2, 3, 4]
    }
  };
};

export default function SpNoParamPage({userPkList}: PageProp) {
  console.log(userPkList);
  return (
      <>
        <Head>
          <title>sp-no-param</title>
        </Head>
        <PropertyText>userPkList = {userPkList}</PropertyText>
      </>
  );
}
