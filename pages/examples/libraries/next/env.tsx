import React from 'react';
import type {GetServerSideProps} from 'next';
import env from '@util/env';
import styled from 'styled-components';

interface PageProp {
  publicEnv: string;
  privateEnv: string;
  commonEnv: string;
}

export default function Page({publicEnv, privateEnv, commonEnv}: PageProp) {
  return (
    <div>
      <Heading>In the getServerSideProps</Heading>
      <div>publicEnv=<b>{publicEnv}</b></div>
      <div>privateEnv=<b>{privateEnv}</b></div>
      <div>commonEnv=<b>{commonEnv}</b></div>
      
      <Heading style={{marginTop: 20}}>In the client</Heading>
      <div>publicEnv=<b>{String(env.public.pub)}</b></div>
      <div>privateEnv=<b>{String(env.private.prv)}</b></div>
      <div>commonEnv=<b>{String(env.private.common)}</b></div>
    </div>
  );
}

const Heading = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`;

/**
 * yarn dev
 * yarn build-dev
 * yarn build
 * https://stackoverflow.com/a/62464710/16599173.
 */
export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  return {
    props: {
      privateEnv: env.public.pub,
      publicEnv: env.private.prv as string,
      commonEnv: env.private.common as string
    }
  };
};
