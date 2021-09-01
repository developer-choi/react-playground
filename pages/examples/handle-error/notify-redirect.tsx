import React from 'react';
import Head from 'next/head';
import {
  getServerSidePropsTemplate,
  sspTemplate
} from '../../../src/utils/api/server-side-error';
import ServerSideError from '../../../src/utils/auth/ServerSideError';
import BaseApi from '../../../src/api/BaseApi';

interface PageProp {
  apiResponse: string;
}

export const getServerSideProps = getServerSidePropsTemplate<PageProp>(async () => {
  const api = new SomeApi();
  // TODO try-catch 컨셉으로 시도해봤으나 이렇게 기존 API 메소드 마다 전부 try catch로 error를 ServerSideError로 감싸줘야하는 수고가 발생함.
  await api.someCommon1();
  await api.someCommon2();
  const { data } = await api.getSomeData1();
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

class SomeApi extends BaseApi {
  constructor() {
    super('some');
  }
  
  getSomeData1() {
    try {
      return new Promise<{data: string}>(resolve => {
        resolve({
          data: 'SOME_DATA'
        });
      });
    
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
  
  someCommon1() {
    try {
      return new Promise<{data: string}>(resolve => {
        resolve({
          data: 'SOME_DATA'
        });
      });
    
    } catch (error) {
      // TODO ?? 이 API는 ClientSide에서도 사용해야하는데 이렇게 API 메소드부터 이렇게 ServerSideError를 throws하도록 만들어야해서 문제가됨.
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
  
  someCommon2() {
    try {
      return new Promise<{data: string}>(resolve => {
        resolve({
          data: 'SOME_DATA'
        });
      });
    
    } catch (error) {
      // TODO ?? 이 API는 ClientSide에서도 사용해야하는데 이렇게 API 메소드부터 이렇게 ServerSideError를 throws하도록 만들어야해서 문제가됨.
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
}
