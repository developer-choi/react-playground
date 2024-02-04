import React, {useCallback} from 'react';
import {useWindowMessageReceiver} from '@util/extend/browser/window-popup';
import {convertSnsUserData, getSnsLoginPopupUrl} from '@util/services/member/sns-login';
import {useHandleClientSideError} from '@util/services/handle-error/client-side-error';
import type {NaverLoginResult, SnsUserData} from '@type/services/sns-login';

// URL: http://localhost:3000/experimental/member/sns-login
export default function Page() {
  const handleClientSideError = useHandleClientSideError();

  const {openNewWindow} = useWindowMessageReceiver<Partial<NaverLoginResult>>({
    type: 'sns-login-from-login',
    receiveCallback: async (data) => {
      if (!data.code || !data.state) {
        alert('네이버 로그인 현재 못함');
        return;
      }

      try {
        await loginApi(data as NaverLoginResult);
        // 네이버 로그인 성공처리
      } catch (error: any) {
        if (error.code === 'NOT_MEMBER') {
          if (!confirm('가입된 계정이 없습니다. 회원가입을 진행하시겠습니까?')) {
            return;
          }

          try {
            const userData = convertSnsUserData('naver', error.data);
            await signupApi(userData);
          } catch (error) {
            handleClientSideError(error);
          }
        }
      }
    }
  });

  const onClick = useCallback(() => {
    openNewWindow(getSnsLoginPopupUrl('naver'));
  }, [openNewWindow]);

  return (
    <div>
      <button onClick={onClick}>네이버 로그인 버튼</button>
    </div>
  );
}

async function loginApi(params: NaverLoginResult) {
}

async function signupApi(params: SnsUserData) {
}
