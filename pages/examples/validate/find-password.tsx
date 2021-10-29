import React, {useCallback, useRef, useState} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Form from '@component/extend/Form';
import {flexDirectionColumn} from '@util/style/css';
import InputText from '@component/extend/InputText';
import {validateOriginPassword} from '@util/validator/password';
import {toast} from 'react-toastify';
import {Button} from '@component/atom/button/button-presets';

export default function Page() {
  const [originPassword, setOriginPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const originPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  
  const onSubmit = useCallback(() => {
    const validateResult = validateOriginPassword({originPassword, newPassword, confirmPassword});
  
    if (!validateResult.validated) {
  
      switch (validateResult.reason) {
        case 'INVALID_ORIGIN_PASSWORD':
          originPasswordRef.current?.focus();
          break;
        case 'INVALID_NEW_PASSWORD':
          newPasswordRef.current?.focus();
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
  }, [confirmPassword, newPassword, originPassword]);
  
  return (
    <>
      <Head>
        <title>비밀번호 변경하기</title>
      </Head>
      <StyledForm onSubmit={onSubmit}>
        <InputText ref={originPasswordRef} value={originPassword} onChangeText={setOriginPassword} placeholder="기존비밀번호를 입력해주세요."/>
        <InputText ref={newPasswordRef} value={newPassword} onChangeText={setNewPassword} placeholder="변경하실 비밀번호를 입력해주세요."/>
        <InputText ref={confirmPasswordRef} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="비밀번호를 다시 확인해주세요."/>
        <Button type="submit">재설정</Button>
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
