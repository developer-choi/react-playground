import React from 'react';
import { Counter, TabMenus, Timer } from './sp';

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
