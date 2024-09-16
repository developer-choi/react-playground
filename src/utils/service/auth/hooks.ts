import {useCallback} from 'react';
import {signIn, signOut} from 'next-auth/react';
import {getRedirectUrlWhenLoginSuccess} from '@/utils/service/auth/redirect';
import {PostLoginApiResponse} from '@/types/services/auth';

/**
 * 로그인 성공 (아이디비번로그인, SNS 로그인 등) 후 실행되야하는 함수
 * https://docs.google.com/document/d/1PRzGtGusjqi4LfU0R4dC4wLPKfxQN5GcJ7JJXOAkdK0/edit
 */
export function useLogin() {
  return useCallback((response: PostLoginApiResponse) => {
    const callbackUrl = response.code === 'EXPIRED' ? '/30일 지나서 로그인 새로 하라는 그 페이지 경로' : getRedirectUrlWhenLoginSuccess();

    /**
     * 로그인 성공 후 리셋해야하는 캐시같으게 있다면 리셋 해야하는데,
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
  return useCallback(async () => {
    try {
      await backendLogoutApi();

      // redirect는 따로 여기서 안시킴. InnerSessionProvider에서 session.status가 변하는걸 감지해서 처리함.
      await signOut({
        redirect: false
      });

      /**
       * 로그아웃 성공 후 리셋해야하는 캐시가 있다면 여기서 리셋
       */
    } catch (error: any) {
      // [Authentication 요구사항 > Final step. 로그아웃 하기 (주로 헤더에있는)] https://docs.google.com/document/d/1p5jI5u3NZOHbRge9M0ZCmhQgqCriZfpUGks6I7blQlI/edit#heading=h.41h4ckzdotb

      await signOut({
        redirect: false
      });

      // already logout
      if (error.status === 401) {
        return;
      }

      throw error;
    }
  }, [])
}

async function backendLogoutApi() {

}
