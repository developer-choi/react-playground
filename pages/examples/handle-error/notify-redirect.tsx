import React from 'react';
import Head from 'next/head';
import {
  getServerSidePropsTemplate,
  sspTemplate
} from '../../../src/utils/api/server-side-error';
import ServerSideError from '../../../src/utils/auth/ServerSideError';

interface PageProp {
  apiResponse: string;
}

export const getServerSideProps = getServerSidePropsTemplate<PageProp>(async () => {
  const { data } = await someApi();
  return {
    props: {
      apiResponse: data
    }
  };
});

const NotifyRedirectPage = ({}: PageProp) => {
  
  return (
      <>
        <Head>
          <title>notify-redirect</title>
        </Head>
        <div>
          notify-redirect Page
        </div>
      </>
  );
}

export default sspTemplate(NotifyRedirectPage);

/**
 * @throws ServerSideError
 */
async function someApi() {
  try {
    // return await (async () => {
    //   return Promise.reject('Some Error Message (INTERNAL)');
    // })();
  
    return {
      data: 'SOME_DATA'
    };
    
  } catch (error) {
    throw new ServerSideError(error.message, {
      props: {
        _notifyAndRedirect: {
          message: 'Some Notify Message',
          redirect: '/'
        }
      }
    });
  }
}
