import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import Form from '@component/extend/Form';
import {flexDirectionColumn} from '@util/services/style/css';
import InputText from '@component/extend/InputText';
import {toast} from 'react-toastify';
import Button from '@component/atom/button/Button';
import {getSSPForNotLoggedIn} from '@util/services/auth/auth';
import AuthApi from '@api/AuthApi';
import {useRouter} from 'next/router';
import {handleClientSideError} from '@util/services/handle-error/client-side-error';
import ValidateError from '@util/services/handle-error/ValidateError';

export default function Page() {
  const {replace} = useRouter();
  const [originPassword, setOriginPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const originPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  
  const onSubmit = useCallback(async () => {
    const api = new AuthApi();
    try {
      await api.putResetPassword({originPassword, newPassword, confirmPassword});
      alert('비밀번호가 초기화되었습니다.');
      await replace('/examples/handle-error/login');

    } catch (error) {
      if (error instanceof ValidateError) {
        switch (error.reason) {
          case 'originPassword':
            originPasswordRef.current?.focus();
            break;
          case 'newPassword':
            newPasswordRef.current?.focus();
            break;
          case 'confirmPassword':
            confirmPasswordRef.current?.focus();
            break;
        }
        toast.error(error.message);
        return;
      }

      handleClientSideError(error);
    }
  }, [confirmPassword, newPassword, originPassword, replace]);
  
  return (
    <StyledForm onSubmit={onSubmit}>
      <InputText ref={originPasswordRef} value={originPassword} onChangeText={setOriginPassword} placeholder="기존비밀번호를 입력해주세요."/>
      <InputText ref={newPasswordRef} value={newPassword} onChangeText={setNewPassword} placeholder="변경하실 비밀번호를 입력해주세요."/>
      <InputText ref={confirmPasswordRef} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="비밀번호를 다시 확인해주세요."/>
      <Button type="submit">재설정</Button>
    </StyledForm>
  );
}

export const getServerSideProps = getSSPForNotLoggedIn;

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
