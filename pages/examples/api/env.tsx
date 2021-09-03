import React from 'react';
import type { GetServerSideProps } from 'next';

export interface PageProp {
  publicEnv: string;
  privateEnv: string;
}

export default function Page({publicEnv, privateEnv}: PageProp) {
  return (
    <div>
      <div>publicEnv=<b>{publicEnv}</b></div>
      <div>privateEnv=<b>{privateEnv}</b></div>
    </div>
  );
}

/**
 * yarn dev
 * yarn build-dev
 * yarn build
 * https://stackoverflow.com/a/62464710/16599173.
 */
export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  return {
    props: {
      privateEnv: process.env.NEXT_PUBLIC_PUBLIC as string,
      publicEnv: process.env.PRIVATE as string
    }
  };
};