import React from 'react';
import type {GetServerSideProps} from 'next';
import PropertyText from '@component/atom/PropertyText';

interface PageProp {
  userNameList: string[];
}

export default function SspMustParamPage({userNameList}: PageProp) {
  console.log(userNameList);
  return (
    <PropertyText>{JSON.stringify(userNameList)}</PropertyText>
  );
}

/**
 * The type of params must be string[].
 *
 * Because, if there is no param, 404 will fall,
 * and if there is one param, there will be an array of one element,
 * and if there are two param, there will be an array of two elements.
 * (Look at the file name)
 */
type ParamType =  {
  id: string[];
}

export const getServerSideProps: GetServerSideProps<PageProp, ParamType> = async ({params}) => {
  //The type was determined as an assertion by the ParamType above.
  const {id} = params as ParamType;
  return {
    props: {
      userNameList: id
    }
  };
};
