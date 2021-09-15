import React from 'react';
import {Counter, Navigation} from './one';
import {store} from '@store/store';

export default function TwoPage({count}: {count: number}) {
  return (
      <>
        <h1>Two Page (ssr count {count})</h1>
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
