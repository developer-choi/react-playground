import React from 'react';
import Head from 'next/head';
import type {GetServerSideProps} from 'next';

interface PageProp {
  nickNames: string[];
}

export default function SspOptionalParamsPage({nickNames}: PageProp) {
  console.log(nickNames);
  return (
      <>
        <Head>
          <title>ssp-optional-params</title>
        </Head>
        {nickNames}
      </>
  );
}

/**
 * The type of params must be an optional string array.
 * Because, if there is no param, there is an empty object.
 */
type ParamType = {
  id?: string[];
};

export const getServerSideProps: GetServerSideProps<PageProp, ParamType> = async ({params}) => {
  //You can make a type assertion such as allocating to an empty array by the type of the above params.
  const {id = []} = params as ParamType;
  return {
    props: {
      nickNames: id
    }
  };
};
