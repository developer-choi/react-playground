import React, {useCallback, useState} from 'react';
import Button from '@component/atom/element/Button';
import {useQuery} from '@tanstack/react-query';

/**
 * 회원가입 폼 > (기존에 요청한) 휴대폰 인증 절차 중에서
 * 사용자가 입력한 [받은 인증번호]를 제출하고
 * 인증번호가 일치하는지 확인하는 부분을 가정하고 만들었음.
 */

export default function Page() {
  const [authCode, setAuthCode] = useState<string>('');

  const {data} = useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    queryKey: ['some-key'],
    queryFn: () => verifyApi(authCode)
  });

  const verifyAuthCode = useCallback(() => {
    // ... useQuery()의 queryFn을 어떻게 실행시키지? 온몸비틀어서 queryKey값을 바꿔야하나? ㅋㅋㅋ ㅠㅠ
  }, []);

  return (
    <>
      <input disabled={data?.verified} onChange={event => setAuthCode(event.target.value)} placeholder="인증번호 입력박스"/>
      <Button disabled={data?.verified} onClick={verifyAuthCode}>인증번호 확인</Button>
      <Button disabled={!data?.verified}>회원가입</Button>
    </>
  );
}

async function verifyApi(authCode: string) {
  return {
    verified: true
  };
}
