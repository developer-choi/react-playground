import React from 'react';
import {Counter, Navigation} from '@pages/examples/libraries/store/one';
import {store} from '@store/store';

export default function ThreePage({count}: {count: number}) {
  return (
      <>
        <h1>Three Page (ssr count {count})</h1>
        <Navigation/>
        <Counter/>
      </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      count: store.getState().counter.count
    }
  };
}

