import {useCallback} from 'react';
import {signIn, signOut} from 'next-auth/react';
import {getRedirectUrlWhenLoginSuccess} from '@/utils/service/auth/redirect';
import {LoginApiResponse} from '@/types/services/auth';
import {usePathname, useSearchParams} from 'next/navigation';
import {getNextNavigating} from '@/utils/service/auth/path';
import * as Sentry from '@sentry/nextjs';

/**
 * 로그인 성공 (아이디비번로그인, SNS 로그인 등) 후 실행되야하는 함수
 * https://docs.google.com/document/d/1PRzGtGusjqi4LfU0R4dC4wLPKfxQN5GcJ7JJXOAkdK0/edit
 */
export function useLogin() {
  return useCallback((response: LoginApiResponse) => {
    const callbackUrl = response.code === 'EXPIRED' ? '/30일 지나서 로그인 새로 하라는 그 페이지 경로' : getRedirectUrlWhenLoginSuccess();

    /**
     * 아이디비번 로그인, SNS 로그인 성공 후 리셋해야하는 캐시같으게 있다면 리셋 해야하는데,
     * [Next Auth Error] https://docs.google.com/document/d/10A0J-OGlI7vebE__6nzCAAJwC_lDr2XsDGRIgklGtW8/edit#heading=h.tjo0w5se4t8 에 의해,
     * 세션 셋팅하는 시점과 리다이랙트 해야하는 시점이 똑같고 분리를 할 수 없어서,
     * 세션 세팅 후 임의의 API 호출해서 캐시 셋팅하고 나서 그 다음에 리다이랙트를 할 수 없는 상태임. ㅠㅠ
     */

    signIn("credentials", {
      callbackUrl,
      ...response
    }, {
      replace: true,
    });
  }, []);
}

/**
 * 로그아웃 버튼에 전달하는 콜백함수
 * https://docs.google.com/document/d/1PRzGtGusjqi4LfU0R4dC4wLPKfxQN5GcJ7JJXOAkdK0/edit
 */
export function useLogout() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * @param nextUrl pathname + querystring만 지원
   * @exception 이동하려는 그 다음 페이지가 잘못된 경우 로그인 페이지로 이동 (로그인 안한 상태로 로그인을 해야만 갈 수 있는 url로 전달한다거나)
   * @description 기획에서, 로그아웃 시 xxx 페이지로 이동 시키라는 요구사항을 대응하기 이함.
   */
  return useCallback(async (nextUrl?: string) => {
    try {
      await backendLogoutApi();
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      const nextNavigating = getNextNavigating({
        nextUrl: nextUrl ?? pathname + '?' + searchParams.toString(),
        isLoggedIn: false,
      });

      await signOut({
        callbackUrl: nextNavigating.nextUrl,
      });
    }
  }, [pathname, searchParams])
}

async function backendLogoutApi() {

}
