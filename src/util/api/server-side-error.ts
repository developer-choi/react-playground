import type {GetServerSideProps, GetServerSidePropsContext} from 'next';
import ServerSideError from '@util/auth/ServerSideError';
import {CurrentlyLoginUserInfo, getCurrentlyLoginUserInfo, getLoginRedirectUrl} from '@util/auth/auth';
import {FunctionComponent, useEffect} from 'react';
import {useRouter} from 'next/router';

export interface NotifyAndRedirectProps {
  _notifyAndRedirect: {
    message: string;
    redirect: string;
  };
}

export function sspTemplate<P>(Component: FunctionComponent<P>): FunctionComponent<P> {
  return function (props: P | NotifyAndRedirectProps) {
    const { replace } = useRouter();
    const notifyAndRedirect = '_notifyAndRedirect' in props ? props._notifyAndRedirect : null;
    
    useEffect(() => {
      if (notifyAndRedirect) {
        alert(notifyAndRedirect.message);
        replace(notifyAndRedirect.redirect).then();
      }
    }, [notifyAndRedirect, replace]);
    
    if (notifyAndRedirect) {
      return null;
    }
    
    return Component(props as P);
  };
}

// TODO 채널 하위페이지처럼 특정 페이지 집합에 대해서 추가적인 페이지 에러처리 템플릿을 만들어서 적용할 수 있어야함.
export declare function subTemplate<P>(Component: FunctionComponent<P>): FunctionComponent<P>;

export function getServerSidePropsTemplate<T>(callback: GetServerSideProps<T>): GetServerSideProps<T> {
  return async function (context: GetServerSidePropsContext) {
    try {
      return await callback(context);
      
    } catch (error) {
      if (error instanceof ServerSideError) {
        return error.result;
        
      } else {
        throw error;
      }
    }
  }
}

/**
 * Rules
 *
 * Arguments: almost context
 * Return: anything
 * throws: ServerSideError
 *
 * I suggest writing functions throwing ServerSideError only in this file.
 * Because To combine in this function. (example is in below)
 *
 * Usage
 * 1. In getServerSideProps (for ServerSideError and catch phrase)
 * 2. Others (for catch phrase)
 */

/*

async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    await someLogic1();
    const result1 = await someLogic2();
    await someLogic3();
    const result2 = await someLogic4(result1);
    return {
      props: {
        result2
      }
    };
  } catch (error) {
    throw error;
  }
}

 */

/**
 * I'm thinking naming rule.
 * @throws ServerSideError
 *
 * TODO throwIfNotLoggedIn() 이거와 의도가 100% 겹침. 하나의 동작(로그인이 되어있는지 여부) 에 따라 다른 에러를 반환하기위해 함수를 매번 계속 새로 만들어야한다는것이 큰 단점.
 */
export function getUserInfoSSP(context: GetServerSidePropsContext): CurrentlyLoginUserInfo {
  const currentlyUserInfo = getCurrentlyLoginUserInfo();
  
  if (!currentlyUserInfo) {
    throw new ServerSideError("로그인 후 이용이 가능합니다.", {
      redirect: {
        destination: getLoginRedirectUrl(context.resolvedUrl),
        permanent: false
      }
    });
  }
  
  return currentlyUserInfo;
}
