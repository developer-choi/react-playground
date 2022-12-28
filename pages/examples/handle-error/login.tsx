import React, {useCallback, useEffect, useRef, useState} from 'react';
import Button from '@component/atom/element/Button';
import {useRouter} from 'next/router';
import {getAfterLoginSuccessUrl, getSSPForNotLoggedIn} from '@util/services/auth/auth';
import {handleClientSideError} from '@util/services/handle-error/client-side-error';
import AuthApi from '@api/AuthApi';
import {useAppDispatch} from '@store/hooks';
import {setUserActionCreator} from '@store/reducers/user';
import Form from '@component/extend/Form';
import InputText from '@component/extend/InputText';
import {haveAxiosResponse} from '@api/BaseApi';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import ValidateError from '@util/services/handle-error/ValidateError';

export default function LoginPage() {
  const {prefetch, replace, push} = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('test-email@test.com');
  const emailRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState('test-password');
  const passwordRef = useRef<HTMLInputElement>(null);

  const onClick = useCallback(async () => {
    const api = new AuthApi();

    try {
      const {data: {info}} = await api.postLogin(email, password);
      dispatch(setUserActionCreator(info));
      const redirectUrl = getAfterLoginSuccessUrl();
      replace(redirectUrl).then();

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
  }, [dispatch, email, password, push, replace]);

  useEffect(() => {
    const redirectUrl = getAfterLoginSuccessUrl();
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
