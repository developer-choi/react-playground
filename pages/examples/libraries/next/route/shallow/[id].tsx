import React, {memo} from 'react';
import Link from 'next/link';
import type {GetServerSideProps} from 'next';
import {Anchor} from '@component/atom/html';
import useCounter from '@util/custom-hooks/useCounter';

// http://localhost:3000/examples/libraries/next/route/shallow/shallow-1
export default function Page() {
  console.log('re-render Page');

  return (
    <>
      <PathWithShallowLink/>
      <QueryLink/>
      <PathLink/>
      <Memo/>
    </>
  );
}

function PathWithShallowLink() {
  const {increase, count} = useCounter({log: 'shallow-link'});

  return (
    <Link href={`/examples/libraries/next/route/shallow/path-with-shallow-${count}`} shallow prefetch={false}>
      <Anchor onClick={increase} className="block">Shallow Link</Anchor>
    </Link>
  );
}

function QueryLink() {
  const {increase, count} = useCounter({log: 'query-link'});

  return (
    <Link href={`/examples/libraries/next/route/shallow/query?query=${count}`} prefetch={false}>
      <Anchor onClick={increase} className="block">Query Link</Anchor>
    </Link>
  );
}

function PathLink() {
  const {increase, count} = useCounter({log: 'path-link'});

  return (
    <Link href={`/examples/libraries/next/route/shallow/path-${count}`} prefetch={false}>
      <Anchor onClick={increase} className="block">Path Link</Anchor>
    </Link>
  );
}

const Memo = memo(function Memo() {
  console.log('re-render Memo');
  return null;
});

export const getServerSideProps: GetServerSideProps = async ({params, query}) => {
  console.log('getServerSideProps call()', params, query);

  return {
    props: {}
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking'
//   };
// };
//
// export const getStaticProps: GetStaticProps = async ({params}) => {
//   console.log('getSTaticProps', params);
//   return {
//     props: {}
//   };
// };
