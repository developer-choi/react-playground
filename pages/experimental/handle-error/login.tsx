import React, {useCallback, useEffect, useRef, useState} from 'react';
import Button from '@component/atom/element/Button';
import {useRouter} from 'next/router';
import {setLoginToken} from '@util/services/auth/auth-token';
import Form from '@component/extend/Form';
import InputText from '@component/extend/InputText';
import {haveAxiosResponse} from '@api/config';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import ValidateError from '@util/services/handle-error/ValidateError';
import {postAuthLoginApi} from '@api/auth-api';
import {getSSPForNotLoggedIn} from '@util/services/auth/auth-util';
import {useHandleClientSideError} from '@util/services/handle-error/client-side-error';
import {useRefreshAuth} from '@util/services/auth/auth-user-cache';
import {getLoginRedirectUrl} from '@util/services/auth/auth-redirect';

// URL: http://localhost:3000/experimental/handle-error/login
export default function LoginPage() {
  const {prefetch, replace, push} = useRouter();
  const handleClientSideError = useHandleClientSideError();

  const [email, setEmail] = useState('test-email@test.com');
  const emailRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState('test-password');
  const passwordRef = useRef<HTMLInputElement>(null);

  const refreshAuth = useRefreshAuth()

  const onClick = useCallback(async () => {
    try {
      const {info, accessToken} = await postAuthLoginApi(email, password);

      /**
       * 서버에서 login API response header에 Set-Cookie로 쿠키 만들어줄 경우
       * 프론트에서 이 코드라인에서 직접 쿠키만들어서 accessToken값을 저장하는 로직 작성 안해도 되지만,
       *
       * 서버에서 안해주는경우, 이 코드라인에서 직접 쿠키만들어서 accessToken 저장하는 코드 작성해야함.
       */
      setLoginToken({
        accessToken,
        userPk: info.userPk
      });

      refreshAuth().then();

      replace(getLoginRedirectUrl()).then();

    } catch (error) {
      if(error instanceof ValidateError) {
        const {reason, message} = error;

        switch (reason) {
          case 'email':
            emailRef.current?.focus();
            toast.error(message);
            return;
          case 'password':
            passwordRef.current?.focus();
            toast.error(message);
            return;
          default:
            handleClientSideError(error);
            return;
        }
      }

      const axiosError = haveAxiosResponse(error);

      if (!axiosError || axiosError.response.data.customStatus !== 1234) {
        handleClientSideError(error);
        return;
      }

      toast.error('Login is restricted because the password is incorrect more than 10 times.');
      await push('/');
    }
  }, [email, handleClientSideError, password, push, refreshAuth, replace]);

  useEffect(() => {
    const redirectUrl = getLoginRedirectUrl();
    prefetch(redirectUrl).then();
  }, [prefetch, replace]);

  return (
    <StyledForm>
      <InputText ref={emailRef} autoFocus type="email" value={email} onChangeText={setEmail} placeholder="email" name="email" onInvalid={(e) => {e.preventDefault()}}/>
      <InputText ref={passwordRef} type="password" value={password} onChangeText={setPassword} placeholder="password"/>
      <Button type="submit" onClick={onClick}>로그인</Button>
    </StyledForm>
  );
}

export const getServerSideProps = getSSPForNotLoggedIn;

const StyledForm = styled(Form)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 10px;
  
  input {
    padding: 5px;
    border: 2px solid ${props => props.theme.main};
    border-radius: 5px;
  }
`;
