import React from 'react';
import OgMeta from '@component/atom/OgMeta';
import {useDelay} from '@util/extend/time';
import type {GetServerSideProps} from 'next';
import {validateNumber} from '@util/extend/browser/query-string';
import Head from 'next/head';

// URL: http://localhost:3000/study/browser/lazy-meta/1
interface PageProp {
  second: number;
}

export default function Page({second}: PageProp) {
  const enabled = useDelay(second * 1000);

  return (
    <>
      {!enabled ? null : (
        <>
          <Head>
            <title>{second}-title</title>
          </Head>
          <OgMeta
            image="/images/600x314.png"
            title={`Custom Facebook Title-${second}`}
            description={`Custom Facebook Description-${second}`}
          />
        </>
      )}

      <div>
        Open Graph Lazy Test Page {second} seconds
      </div>
    </>
  );
}

type ParamType = {
  second: string;
}

export const getServerSideProps: GetServerSideProps<PageProp, ParamType> = async ({params}) => {
  const second = validateNumber(params?.second);

  return {
    props: {
      second
    }
  };
};
