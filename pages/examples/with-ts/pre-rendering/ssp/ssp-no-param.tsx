import React from 'react';
import Head from 'next/head';
import type {GetServerSideProps} from 'next';

interface PageProp {
  userPkList: number[];
}

/**
 * There is absolutely no reason to provide the second generic parameter of GetServerSideProps.
 * Because it is a static route. (Look at the file name)
 * So the type of context params should be deduced as undefined, which is a very natural result.
 *
 * But daringly, the type of params is ParsedQuery | Just because it is inferred as undefined, there is no reason to modify this.
 * Because there is no need to use the params property itself, there is no reason to receive type inference.
 *
 * Therefore, you only need to use the properties of other contexts, not params.
 */
export const getServerSideProps: GetServerSideProps<PageProp> = async ({params}) => {
  return {
    props: {
      userPkList: [1, 2, 3, 4]
    }
  };
};

export default function SspNoParamPage({userPkList}: PageProp) {
  console.log(userPkList);
  return (
      <>
        <Head>
          <title>ssp-no-param</title>
        </Head>
        {userPkList}
      </>
  );
}
