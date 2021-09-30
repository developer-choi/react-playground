import React from 'react';
import type {GetServerSideProps} from 'next';
import Link from 'next/link';
import {Button} from '@component/atom/button/button-presets';

export default function PreventInServerPage() {
  return (
    <>
      <div>Start</div>
      <Link passHref prefetch={false} href="./end">
        <Button as="a">end페이지 가기</Button>
      </Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const block = query.block !== 'false';
  
  if (block) {
    return {
      redirect: {
        permanent: false,
        destination: './end'
      }
    };
  } else {
    return {
      props: {}
    };
  }
};
