import {QueryClient, useQuery, useQueryClient} from '@tanstack/react-query';
import type {UserInfo} from '@type/response-sub/user-sub';
import {useCallback, useEffect} from 'react';
import {getUserInfoOneApi} from '@api/user-api';
import {getLoginTokenInCookie, LOGIN_TOKEN} from '@util/services/auth/auth-token';
import type {GetServerSidePropsContext} from 'next';
import {useRouter} from 'next/router';
import {putAuthLogoutApi} from '@api/auth-api';
import {removeCookie} from '@util/extend/browser/cookie';
import {AuthError} from '@util/services/auth/AuthError';

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

  const {data} = useQuery<'checking' | null | UserInfo>({
    queryKey: USER_INFO_QUERY_KEY,
    enabled: false,
    initialData: 'checking',
    // queryFn 없기때문에 refetchOnWindowFocus 안써도 됨
  });

  // initialize auto login
  useEffect(() => {
    /**
     * 1. Server Side에서 이미 데이터를 가져온 경우
     * 2. 이전 페이지에서 useAuth()로 데이터를 가져온 다음 페이지 이동했더니 그 페이지에서도 useAuth()를 호출하고있는 경우
     *
     * 이미 데이터가 존재하므로 refetching 하지않음.
     *
     * 이렇게 했기 때문에, queryClient.invalidate() 하더라도 Auth 데이터는 리패칭되지않지만,
     * 리패칭하고싶다면 (회원정보 수정같은거 성공해서 최신화하고 싶은경우)
     * 아래 refreshAuth()를 호출할것.
     */
    if (data !== 'checking' || data !== null) {
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

  return {
    loginStatus: data === 'checking' ? 'checking' : data !== null,
    userInfo: data === 'checking' ? null : data
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
      throw new AuthError(error.message, {
        redirectPath: context.resolvedUrl
      });
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
