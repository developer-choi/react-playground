import React from 'react';
import {useRouter} from 'next/router';

export default function BeRenderedTwoTimesPage() {
  const {query} = useRouter();

  /**
   * Case 1. If I declare getStaticProps() or nothing,
   * Case 2. and If I enter into this page with query-string,
   *
   * This component will be rendered two times.
   * To avoid this case, You can declare getServerSideProps().
   *
   * Documentation: https://nextjs.org/docs/routing/dynamic-routes#caveats
   * Example: http://localhost:3000/examples/next/use-router/be-rendered-two-times?key=value
   */
  console.log('render', query);

  return (
    <div>
      be-rendered-two-times Page
    </div>
  );
}
