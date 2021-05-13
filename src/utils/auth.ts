import Router from 'next/router';
import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {urlStringify} from './extend/query-string';

/**
 * 이 모듈은, 사용자가 로그인 / 로그아웃 상태가 변경되었을 때 즉시 웹페이지를 새로 렌더링하지 않는 웹사이트에서 사용하기위한 모듈.
 *
 * 위의 경우 웹소켓으로 사용자의 로그인 여부를 실시간으로 받아온다거나 하지 않기때문에,
 * 첫 페이지 렌더링시, 또는 특정 버튼을 클릭했을 때 등등 특정 경우마다 사용자가 로그인했는지 안했는지를 꼬박 체크하고 그에맞게 처리를 해야함.
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
  return {
    userPk: 1234,
    anotherToken: 'ASDkjldas9023nasd-daskl-123lkda'
  };
  
  // return undefined;
}

export function isCurrentlyLogin(): boolean {
  return !!getCurrentlyLoginUserInfo();
}

export const LOGIN_REDIRECT_QUERY_KEY = 'redirectUrl';

function getLoginRedirectUrl(redirectUrl?: string) {
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
   */
  notLoginCallback?: () => void;
  
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
export function executeOnlyLogin({notLoginCallback, onlyLoginCallback, enableRedirectUrl = true}: RunOnlyLoginParams) {
  const currentlyUserInfo = getCurrentlyLoginUserInfo();
  
  if (!currentlyUserInfo) {
    notLoginCallback?.();
  
    if (enableRedirectUrl) {
      const {pathname, search, hash} = location;
      Router.replace(getLoginRedirectUrl(`${pathname}${search}${hash}`)).then();
    } else {
      Router.replace('/examples/auth-flow/login').then();
    }
    
    return;
  }
  
  onlyLoginCallback(currentlyUserInfo);
}

export interface PrivateGerServerSideOptions extends Pick<RunOnlyLoginParams, 'enableRedirectUrl'> {
  context: GetServerSidePropsContext;
}

/**
 * 이름을 뭐라고지을지 참 난감한데,
 *
 * getServerSideProps에서 쓰려고 (private page마다 중복되는 리다이랙트 코드 제거하려고) 만들었고,
 *
 * 로그인이 안되어있으면 getServerSideProps에서 Redirect정보를 반환하고
 * 로그인이 되어있으면 전달받은 callback을 실행하여 callback의 반환값을 그대로 반환한다.
 */
export function privateGerServerSideProps<PageProp>(option: PrivateGerServerSideOptions, callback: (currentlyUserInfo: CurrentlyLoginUserInfo) => GetServerSidePropsResult<PageProp>): GetServerSidePropsResult<PageProp> {
  const currentlyUserInfo = getCurrentlyLoginUserInfo();
  const {context, enableRedirectUrl = true} = option;
  
  /**
   * url의 hash는 서버에서 받지 못하기때문에, getServerSideProps에서 설정할 수 있는 redirectUrl은 pathname + querystring이 한계임.
   */
  const redirectUrl = enableRedirectUrl ? context.resolvedUrl : undefined;
  
  if (!currentlyUserInfo) {
    return {
      redirect: {
        destination: getLoginRedirectUrl(redirectUrl),
        permanent: false
      }
    };
  } else {
    return callback(currentlyUserInfo);
  }
}
