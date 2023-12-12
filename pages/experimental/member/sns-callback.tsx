import {useEffect} from 'react';
import type {GetServerSideProps} from 'next';
import {windowPostMessage} from '@util/extend/browser/window-popup';
import type {NaverLoginResult} from '@util/services/member/sns-login';

export default function Page() {
  useEffect(() => {
    const url = new URLSearchParams(location.search);

    // 쿼리스트링은 유저가 직접 조작할 수도 있음.
    windowPostMessage<Partial<NaverLoginResult>>('sns-login-from-login', {
      code: url.get('code') ?? undefined,
      state: url.get('state') ?? undefined
    })
  }, []);

  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};
