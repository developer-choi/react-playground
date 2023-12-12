import React, {useCallback} from 'react';
import {useWindowMessageReceiver} from '@util/extend/browser/window-popup';
import {getSnsLoginPopupUrl, type NaverLoginResult} from '@util/services/member/sns-login';
import axios from 'axios';
import {useHandleClientSideError} from '@util/services/handle-error/client-side-error';

// URL: http://localhost:3000/experimental/member/sns-login
export default function Page() {
  const handleClientSideError = useHandleClientSideError();

  const {openNewWindow} = useWindowMessageReceiver<Partial<NaverLoginResult>>({
    type: 'sns-login-from-login',
    receiveCallback: async (data) => {
      if(!data.code || !data.state) {
        alert('네이버 로그인 현재 못함');
        return;
      }

      try {
        await lgoinApi(data as NaverLoginResult);
        // 네이버 로그인 성공처리
      } catch (error) {
        // 네이버 로그인 실패처리
        handleClientSideError(error);
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

async function lgoinApi(params: NaverLoginResult) {
  return axios.get('/login', {params});
}
