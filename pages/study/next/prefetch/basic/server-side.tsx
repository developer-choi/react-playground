import React from 'react';
import type {GetServerSideProps} from 'next';

export default function Page() {
  return (
    <div>Server Side Rendering</div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: "server side data"
    }
  };
};
