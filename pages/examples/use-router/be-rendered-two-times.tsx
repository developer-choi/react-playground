import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

export default function BeRenderedTwoTimesPage() {
  const { query } = useRouter();
  
  /**
   * Case 1. If I declare getStaticProps() or nothing,
   * Case 2. and If I enter into this page with query-string,
   *
   * This component will be rendered two times.
   * To avoid this case, You can declare getServerSideProps().
   *
   * Documentation: https://nextjs.org/docs/routing/dynamic-routes#caveats
   * Example: http://localhost:3000/examples/use-router/be-rendered-two-times?key=value
   */
  console.log('render', query);
  
  return (
      <>
        <Head>
          <title>be-rendered-two-times</title>
        </Head>
        <div>
          be-rendered-two-times Page
        </div>
      </>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {}
//   };
// }

// export async function getServerSideProps() {
//   return {
//     props: {}
//   };
// }
