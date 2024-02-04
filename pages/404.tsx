import React from 'react';
import {useLogWhenRendering} from '@util/extend/test';

export default function Page(props: any) {
  useLogWhenRendering('props', props);

  return (
    <div>Custom 404 page</div>
  );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  return {
    props: {
      data: 'data'
    }
  };
}
