import {useQuery, useQueryClient} from "@tanstack/react-query";
import type {UserInfo} from "@type/response-sub/user-sub";
import {useEffect} from "react";
import {getUserInfoOneApi} from "@api/user-api";
import {getLoginTokenInCookie} from '@util/services/auth/auth-core';

export const USER_INFO_QUERY_KEY = ['user-info']

export interface UseGetUserResult {
  loginStatus: boolean | 'checking'
  userInfo: UserInfo | null
}

export function useAuth(): UseGetUserResult {
  const queryClient = useQueryClient()

  const {data} = useQuery<UserInfo | 'checking'>({
    queryKey: USER_INFO_QUERY_KEY,
    initialData: 'checking',
    enabled: false,
    refetchOnWindowFocus: false,
    //마이페이지 접근할 때 어차피 사용자정보 API를 Server Side에서 호출해서 최신화할거라서 여기서는 캐시 재사용
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    const token = getLoginTokenInCookie()

    if (!token) {
      queryClient.setQueryData(USER_INFO_QUERY_KEY, null)
      return;
    }

    queryClient.prefetchQuery({
      queryKey: USER_INFO_QUERY_KEY,
      queryFn: () => getUserInfoOneApi(token.userPk)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loginStatus: data === 'checking' ? 'checking' : !!data,
    userInfo: data === 'checking' ? null : data
  }
}
