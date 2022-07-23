import React, {useCallback, useRef, useState} from 'react';
import Head from 'next/head';
import InputText from '@component/extend/InputText';
import Form from '@component/extend/Form';
import {toast} from 'react-toastify';
import {validateConfirmPassword} from '@util/validator/password';
import styled from 'styled-components';
import {flexDirectionColumn} from '@util/style/css';
import { Button } from '@component/atom/button/button-presets';

export default function Page() {
  
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  
  const onSubmit = useCallback(() => {
    const validateResult = validateConfirmPassword({newPassword: password, confirmPassword});
  
    if (!validateResult.validated) {
      switch (validateResult.reason) {
        case 'INVALID_NEW_PASSWORD':
          passwordRef.current?.focus();
          break;
        case 'INVALID_CONFIRM_PASSWORD':
        case 'NOT_MATCH':
          confirmPasswordRef.current?.focus();
          break;
      }
  
      toast.error(validateResult.errorMessage);
      return;
    }
  
    alert('유효성 검증 통과');
  }, [confirmPassword, password]);
  
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <StyledForm onSubmit={onSubmit}>
        <InputText autoFocus value={nickname} onChangeText={setNickname} placeholder="닉네임을 입력해주세요."/>
        <InputText ref={passwordRef} type="password" value={password} onChangeText={setPassword} placeholder="비밀번호를 입력해주세요."/>
        <InputText ref={confirmPasswordRef} type="password" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="비밀번호를 다시 입력해주세요."/>
        <Button type="submit">회원가입</Button>
      </StyledForm>
    </>
  );
}

const StyledForm = styled(Form)`
  ${flexDirectionColumn};
  
  border: 1px solid black;
  padding: 10px;
  margin: 10px auto;
  width: 300px;
  
  > input {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
  }
`;
