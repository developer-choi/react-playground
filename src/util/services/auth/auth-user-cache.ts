import {QueryClient, useQuery, useQueryClient} from '@tanstack/react-query';
import type {UserInfo} from '@type/response-sub/user-sub';
import {useCallback, useEffect} from 'react';
import {getUserInfoOneApi} from '@api/user-api';
import {getLoginTokenInCookie, LOGIN_TOKEN} from '@util/services/auth/auth-token';
import type {GetServerSidePropsContext} from 'next';
import {useRouter} from 'next/router';
import {putAuthLogoutApi} from '@api/auth-api';
import {removeCookie} from '@util/extend/browser/cookie';
import {AuthError} from '@util/services/auth/auth-redirect';

/*************************************************************************************************************
 * Exported functions
 *************************************************************************************************************/

/** 의도
 * Auth에 접근하는 public method는 총 4개
 * useAuth()
 * useRefreshAuth()
 * useLogout()
 * fetchAuthInServerSide()
 *
 * 이것 외에 queryClient.fetchQuery 등의 메소드로 직접 USER_INFO_QUERY_KEY에 캐시 데이터 쓰지않도록
 * USER_INFO_QUERY_KEY값은 export하지않았음.
 */
export function useAuth() {
  const queryClient = useQueryClient();

  const {data} = useQuery<'checking' | null | undefined | UserInfo>({
    queryKey: USER_INFO_QUERY_KEY,
    enabled: false,
    initialData: 'checking',
    // queryFn 없기때문에 refetchOnWindowFocus 안써도 됨
  });

  /** initialize auto login
   * 1. useAuth()가 호출된 웹 페이지를 접근했을 때 (useEffect deps 빈배열)
   * 2. 캐시에 유저정보가 아직 없는 경우 ('checking')
   * 3. 쿠키로 로그인 여부 따져서
   * 4. 이 사용자는 로그인을 안했다 or 했다 + 유저정보값를 캐시에 저장함.
   *
   * 이 외에 어떠한 동작도 하지않음
   * 1. 마이페이지 처럼 private 페이지를 접근하는 경우, Server Side에서 이미 캐시에 유저정보를 저장하고 시작하기때문에, 로직실행이 되지않음.
   * 2. 이미 다른 (useAuth()가 호출된) public 페이지를 거쳐서 온 경우, 캐시에 null을 저장해서 [이 사람은 로그인 안했음] 이라는 의미가 됨.
   * 3. 캐시에 유저정보가 refresh되는 시점은, private 페이지에서 캐시에 유저정보를 저장하고 시작하는 경우 외에 없음.
   * 3(1). private 페이지가 아닌경우, 최신화된 유저정보가 필요없을거라고 가정했기 때문에, 별도의 staleTime을 지정하지않았음.
   * 3(2). 원하는 시점에 유저정보를 최신화를 하고싶은경우, 이 모듈에서 export하는 useRefreshAuth() 사용할것. (예시: 회원정보 수정페이지에서 수정완료한경우 리패칭하고싶을 때)
   * 3(3). 그래서, invalidate할 수 있는 수단을 export하지않았음. (쿼리키도 export하지않았음.)
   */
  useEffect(() => {
    if (data !== 'checking') {
      return;
    }

    const loginCookie = getLoginTokenInCookie();

    if (!loginCookie) {
      queryClient.setQueryData(USER_INFO_QUERY_KEY, null);
      return;
    }

    queryClient.fetchQuery({
      queryKey: USER_INFO_QUERY_KEY,
      queryFn: () => getUserInfoOneApi(loginCookie.userPk),
    }).catch((error) => {
      handleLoginError(error, queryClient);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginStatus: 'checking' | boolean = data === 'checking' ? 'checking' : data !== null;
  const userInfo: null | undefined | UserInfo = data === 'checking' ? null : data;

  return {
    loginStatus,
    userInfo
  };
}

export function useRefreshAuth() {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    const loginCookie = getLoginTokenInCookie();

    if (loginCookie) {
      try {
        await queryClient.fetchQuery({
          queryKey: USER_INFO_QUERY_KEY,
          queryFn: () => getUserInfoOneApi(loginCookie.userPk)
        });
      } catch (error) {
        handleLoginError(error, queryClient);
      }
    }
  }, [queryClient]);
}

export function useLogout() {
  const {replace} = useRouter();
  const queryClient = useQueryClient();

  return useCallback(async (redirectPath = '/') => {
    queryClient.setQueryData(USER_INFO_QUERY_KEY, null);

    try {
      await putAuthLogoutApi();
    } catch (error) {
      console.error(error);
    } finally {
      removeCookie(LOGIN_TOKEN);
    }

    replace(redirectPath);
  }, [queryClient, replace]);
}

// 주로 마이페이지 하위 페이지에서 쓰기 위함
export async function fetchAuthInServerSide(queryClient: QueryClient, context: GetServerSidePropsContext) {
  try {
    const {userPk} = getLoginTokenInCookie({
      throwable: true,
      context
    });

    // 호출하는곳에서 다른 API들과 함께 Promise.all()같은걸 사용할 수 있기 때문에, fetchQuery에서 반환되는 Promise를 그대로 리턴함.
    return queryClient.fetchQuery({
      queryKey: USER_INFO_QUERY_KEY,
      queryFn: () => getUserInfoOneApi(userPk, context)
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      handleLoginError(error, queryClient, context);
      throw error; //호출한 페이지의 getServerSideProps에서는 이 AuthError를 잡아서 로그인페이지같은데로 보내는 등의 처리를 해야함.
    } else {

      /**
       * 로그인이 이미 되어있는데도 불구하고 API 호출하다가 에러가 났으면, 다시 로그인을 유도하는것은 의미가 없기 때문에,
       * 이 함수에서 처리해야하는 범위는 이미 벗어났으므로 에러를 처리하지않고 호출한곳으로 다시 던짐
       */
      throw error;
    }
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const USER_INFO_QUERY_KEY = ['user-info'];

function handleLoginError(error: any, queryClient: QueryClient, context?: GetServerSidePropsContext) {
  console.error(error);
  removeCookie(LOGIN_TOKEN, context);
  queryClient.setQueryData(USER_INFO_QUERY_KEY, null);
}
