import Router from 'next/router';
import type {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {urlStringify} from '../extend/query-string';
import {useEffect} from 'react';
import type {ParsedError} from './axios-config';
import type {GetServerSideProps} from 'next';

/**
 * 이 모듈은, 사용자가 로그인 / 로그아웃 상태가 변경되었을 때 즉시 웹페이지를 새로 렌더링하지 않는 웹사이트에서 사용하기위한 모듈.
 *
 * 위의 경우 웹소켓으로 사용자의 로그인 여부를 실시간으로 받아온다거나 하지 않기때문에,
 * 첫 페이지 렌더링시, 또는 특정 버튼을 클릭했을 때 등등 특정 경우마다 사용자가 로그인했는지 안했는지를 꼬박 체크하고 그에맞게 처리를 해야함.
 *
 * 그래서, 다른 로그인된 모든 기기 즉시 로그아웃까지는 안되지만
 * 다른 로그인된 기기가 어떤 private 요청을 보냈을 때 로그아웃을 시키는것은 대응이 가능함.
 */

/**
 * 로그인이 되어있는 유저라면 반드시 갖고있어야하는 값의 타입.
 * 이걸로 private API를 호출할 때 사용할 예정.
 *
 * 이 타입의 값을 쿠키나 로컬스토리지같은 어떠한 저장공간에 저장을 하고있어야함.
 */
export interface CurrentlyLoginUserInfo {
  //예를들어 DB에서 사용자를 구분할 수 있는 PK같은 것 (회원번호같은거)
  userPk: number;
  anotherToken: string;
}

/**
 * 주로 호출되는곳은
 * 1. getServerSideProps과 (아직 페이지 렌더링안됨 = 접근할 수 있는 API가 한정적임. Localstorage같은곳에 접근못함)
 * 2. 특정 버튼의 onClick일 떄 (이미 페이지 렌더링됨)
 *
 * 위와같은 모든 경우에 대해 현재 사용자가 로그인이 되어있는지를 체크할 수 있는 함수가 제일먼저 필요함.
 * 이 함수는, 이 함수가 실행됬을 "때"를 기준으로 로그인이 되어있는지를 판단하여 반환해야함.
 *
 * 또한, 입력값은 없음 (= function signature에 없음.)
 * 숨겨진 입력으로는 쿠키로 할지 로컬스토리지로 할지 잘 모르겠음.
 * 사용자가 로그인했는지, 만약 로그인했다면 사용자를 특정할 수 있는 정보를 쿠키에담을지 로컬스토리지에 담을지 아니면 다른데에 담을지가 애매하기 때문임.
 * NextJs에서 getServerSideProps에서 사용자의 정보를 얻어오려면 로컬스토로지에 저장하는게 안되서 고민임.
 */
export function getCurrentlyLoginUserInfo(): CurrentlyLoginUserInfo | undefined {
  // return {
  //   userPk: 1234,
  //   anotherToken: 'ASDkjldas9023nasd-daskl-123lkda'
  // };
  
  return undefined;
}

export function isCurrentlyLogin(): boolean {
  return !!getCurrentlyLoginUserInfo();
}

export const LOGIN_REDIRECT_QUERY_KEY = 'redirectUrl';

export function getLoginRedirectUrl(redirectUrl?: string) {
  return `/examples/auth-flow/login${urlStringify({[LOGIN_REDIRECT_QUERY_KEY]: redirectUrl})}`;
}

export interface RunOnlyLoginParams {
  /**
   * 로그인이 되어있다면 실행될 콜백함수
   */
  onlyLoginCallback: (userInfo: CurrentlyLoginUserInfo) => void | Promise<void>;
  
  /**
   * 로그인이 되어있지 않을 때 실행될 함수.
   * 주로 ['로그인 후 이용이 가능합니다'] 같은 팝업 띄우고나서 로그인페이지로 보낸다거나 할 때 씀.
   *
   * 1st parameter로 [로그인페이지로 보내는 callback]을 제공하며,
   * 이 callback을 굳이 제공하는 이유는,
   * 개발자가 원하는 때에 로그인페이지로 보내도록 하기위함.
   *
   * 예를들어 [로그인 후 이용이 가능합니다] 팝업을 띄우는데 이게 alert같은 system popup이 아니라,
   * "custom popup을 띄우고 그 팝업의 확인버튼을 클릭했을 때"에 한해 로그인페이지로 보내는식으로 개발을 해야한다면,
   * 이 callback을 해당 custom popup의 확인버튼의 onclick에 전달하면 된다.
   */
  notLoginCallback: (replaceLoginPageCallback: () => ReturnType<typeof Router.replace>) => void;
  
  /**
   * 로그인이 안되어있으면 로그인페이지로 보낼건데 이 때 현재 url을 query에 담을지 말지 결정. (기본값 true)
   * 이후 query에 담긴 redirectUrl은 로그인이 성공할 경우 다시 이전 페이지로 리다이랙트할 때 사용
   */
  enableRedirectUrl?: boolean;
}

/**
 * 페이지가 렌더링이 되어있는 환경에서 사용되는 함수. (= getServerSideProps에서 호출되면 안됨.)
 * 주로 버튼의 onClick에 전달함. (로그인해야만 클릭할 수 있는 특정유저 신고하기버튼 같은거)
 *
 * 특히, 만약 로그인이 되어있어서 private page에 들어왔다 하더라도 private page에 있는 버튼을 클릭할 때도 로그인이 되어있을거라는 보장은 없기 때문에 필요.
 * 다른탭 또는 새창으로 사이트에 머무르다가 로그아웃한다거나 하는 상황이 발생할 수 있기 때문.
 */

/** TODO
 * 이게 사용되는 위치를 생각해봤을 때 enableRedirectUrl은 항상 true로 사용될 수 밖에 없으니 제거해야하고,
 * notLoginCallback은 뭐 대체로 [로그인 후 이용 가능] 팝업 띄우고 확인눌렀을 때 로그인페이지로 보내는 쪽으로 사용될거기때문에,
 * 기본 notLoginCallback을 기본값으로 구현하자.
 * 결과적으로 그냥 parameter는 onlyLoginCallback 하나만 받는쪽으로 수정하기.
 */
export function executeOnlyLogin({notLoginCallback, onlyLoginCallback, enableRedirectUrl = true}: RunOnlyLoginParams) {
  const currentlyUserInfo = getCurrentlyLoginUserInfo();
  
  if (!currentlyUserInfo) {
    if (enableRedirectUrl) {
      const {pathname, search, hash} = location;
      notLoginCallback(() => {
  
        /**
         * TODO 기존 페이지 URL에 쿼리스트링같은게 있을 수 있으니 이런것도 같이 redirectUrl의 query-string으로 들어갈 수 있도록 구현이 필요.
         */
        return Router.replace(getLoginRedirectUrl(`${pathname}${search}${hash}`));
      });
    } else {
      notLoginCallback(() => {
        return Router.replace('/examples/auth-flow/login');
      });
    }
    
    return;
  }
  
  onlyLoginCallback(currentlyUserInfo);
}

export type PrivateSspCallback<P> = (context: GetServerSidePropsContext, user: CurrentlyLoginUserInfo) => Promise<GetServerSidePropsResult<P>>;

export function privateSspTemplate<P>(callback: PrivateSspCallback<P>): GetServerSideProps<P> {
  
  return async function (context) {
    const currentlyUserInfo = getCurrentlyLoginUserInfo();
    
    if (!currentlyUserInfo) {
      return {
        redirect: {
          destination: getLoginRedirectUrl(context.resolvedUrl),
          permanent: false
        }
      };
    }
    
    return callback(context, currentlyUserInfo);
  };
}

/**
 * 로그인페이지에서 사용하려고 만들었고,
 * 로그인페이지를 벗어나는 아래의 2가지 케이스에 대해 고려가 되었음.
 * case1. [로그인 후 이용이 가능합니다] 팝업을 만난 사용자가 로그인안하고 그냥 다른페이지를 간다거나
 * case2. 로그인을 성공하여 다른페이지로 간 사용자의 경우
 *
 * 다시 초기화를 해서 이후에 또 [로그인 해야 이용가능] 성격의 팝업을 만났을 때 이 팝업을 보여주도록 하기위해/
 */
export function useResetIgnoreForceLogin() {
  useEffect(() => {
    return () => {
      /**
       * ignoreLoginProcess는 store가 아니라 window가 제일 합리적임.
       * 1. 창 하나 (또는 탭하나)에서 유일한 값이고 유지되는 값이어야 하니까.
       * 2. 이 값이 바뀌어도 다시 컴포넌트들이 리렌더링되야하는건 아니니까.
       */
      window.ignoreForceLogin = false;
    };
  }, []);
}

const LOGIN_PAGE_URL_START_PATH = '/login';

export function handleAuthError(data: ParsedError) {
  const {message} = data;
  
  if (!window.ignoreForceLogin && !location.href.startsWith(LOGIN_PAGE_URL_START_PATH)) {
    window.ignoreForceLogin = true;
    alert(message);
    window.location.href = getLoginRedirectUrl(location.href);
  }
}
