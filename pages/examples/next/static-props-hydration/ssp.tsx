import React from 'react';
import {Counter, TabMenus, Timer} from '@pages/examples/next/static-props-hydration/sp';

export default function SSRPage() {
  return (
    <>
      <>
        <TabMenus/>
        <Timer/>
        <Counter/>
      </>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
    }
  };
}
