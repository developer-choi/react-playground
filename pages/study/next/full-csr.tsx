import React from 'react';
import {useRouter} from 'next/router';
import type {GetServerSideProps} from 'next';
import {validateNumberInQueryThrowError} from '@util/extend/browser/query-string';
import {useLogWhenRendering} from '@util/extend/test';

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
    validateNumberInQueryThrowError(query.page);

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
