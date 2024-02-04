import React from 'react';
import {useRouter} from 'next/router';
import type {GetServerSideProps} from 'next';
import {useLogWhenRendering} from '@util/extend/test';
import {validateNumber} from '@util/extend/browser/query-string';

/** Cases
 * http://localhost:3000/study/next/full-csr?page=1
 * http://localhost:3000/study/next/full-csr?page=a
 * http://localhost:3000/study/next/full-csr
 */
export default function Page() {
  return (
    <DeeeeeeeeepComponent/>
  );
}

function DeeeeeeeeepComponent() {
  const {query} = useRouter();

  useLogWhenRendering('render', query);

  return (
    <div>
      page={query.page}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  try {
    validateNumber(query.page);

    return {
      props: {}
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/study/next/full-csr?page=1'
      }
    };
  }
};
