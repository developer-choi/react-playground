import React, {useCallback, useRef, useState} from 'react';
import Head from 'next/head';
import {flexDirectionColumn} from '@util/style/css';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import InputText from '@component/extend/InputText';
import Form from '@component/extend/Form';
import {validatePassword} from '@util/validator/password';
import {Button} from '@component/atom/button/button-presets';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  
  const onSubmit = useCallback(() => {
    const validateResult = validatePassword({value: password});
  
    if (!validateResult.validated) {
      toast.error(validateResult.errorMessage);
      passwordRef.current?.focus();
      return;
    }
  
    alert('유효성 검증 통과');
  }, [password]);
  
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <StyledForm onSubmit={onSubmit}>
        <InputText autoFocus value={email} onChangeText={setEmail} placeholder="아이디를 입력해주세요."/>
        <InputText ref={passwordRef} type="password" value={password} onChangeText={setPassword} placeholder="비밀번호를 입력해주세요."/>
        <Button type="submit">로그인</Button>
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
