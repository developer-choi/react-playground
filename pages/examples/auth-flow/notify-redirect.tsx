import React, {FunctionComponent, PropsWithChildren, useEffect} from 'react';
import Head from 'next/head';
import type {GetServerSideProps} from 'next';
import {StatusCodes} from 'http-status-codes';
import {getLoginRedirectUrl} from '../../../src/utils/api/auth';
import Router from 'next/router';

/** TODO
 * SPOT 365 Mobile
 * pages/note/friend/my.tsx
 * pages/note/friend/block.tsx
 * pages/note/friend/recommend.tsx
 *
 * I created this because I wanted to solve the duplicate code of the exception handling of these 3 page files.
 * And the API calling code is duplicated. I wanted to solve this.
 *
 * First, it's the first private page that I've implemented when I need to give feedback to the user and then send it to the login page.
 */

interface PageProp extends Notify {
  apiResponse?: string;
}

export const getServerSideProps: GetServerSideProps<PageProp> = async ({}) => {
  
  /** TODO
   * 이 API 에러처리 로직과 기존에 만든 privateSspTemplate()과 같이 쓸수 없을까?
   * privateSspTemplate()의 목적은 결국 로그인안했으면 리다이랙트 시켜주고 로그인했으면 API 호출하기위해 만든건데,
   * API 호출을 한다고 하면 에러처리는 꼭 들어가야하니까.
   */
  try {
    const apiResponse = await (async () => {
      // return 'SOME_DATA';
      return Promise.reject('Some Error Message');
    })();
    
    return {
      props: {
        apiResponse
      }
    };
  } catch (error) {
    return {
      props: {
        apiResponse: '',
        _error: {
          status: 401,
          message: 'Un Authentication'
        }
      }
    };
  }
};

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

export default notifyRender(NotifyRedirectPage);

/**
 * Add _ to the prefix because it can overlap with props from existing components.
 */
export interface Notify {
  _error?: {
    message: string;
    status: number;
  };
}

export function notifyRender<P extends Notify>(Component: FunctionComponent<P>): FunctionComponent<P> {
  return function (props: PropsWithChildren<P>) {
  
    const {_error} = props;
    
    useEffect(() => {
      if (_error) {
        handleError(_error);
      }
    }, [_error]);
  
    if (_error) {
      return null;
    }
    
    return Component(props);
  };
}

/**
 * ex: 중복 로그인이 감지되었습니다. 다시 로그인 해주세요. ==> 로그인페이지 이동
 */
const SOME_NOTIFY_AND_REDIRECT_ERROR_CODE = StatusCodes.UNAUTHORIZED;

function handleError({status, message}: {message: string, status: number}) {
  alert(message);
  
  if (status === SOME_NOTIFY_AND_REDIRECT_ERROR_CODE) {
    Router.replace(getLoginRedirectUrl(location.href)).then();
  }
}
