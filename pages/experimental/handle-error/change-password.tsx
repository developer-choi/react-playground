import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import Form from '@component/extend/Form';
import {flexDirectionColumn} from '@util/services/style/css';
import InputText from '@component/extend/InputText';
import {toast} from 'react-toastify';
import Button from '@component/atom/element/Button';
import ValidateError from '@util/services/handle-error/ValidateError';
import {putAuthResetPasswordApi} from '@api/auth-api';
import {getSSPForLoggedIn} from "@util/services/auth/auth-server-side";
import {useHandleClientSideError} from "@util/services/handle-error/client-side-error";
import {useLogout} from '@util/services/auth/auth-user';

// URL: http://localhost:3000/experimental/handle-error/change-password
export default function Page() {
  const handleClientSideError = useHandleClientSideError();
  
  const [originPassword, setOriginPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const logout = useLogout()

  const originPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(async () => {
    try {
      await putAuthResetPasswordApi({originPassword, newPassword, confirmPassword});
      alert('비밀번호가 초기화되었습니다. 다시 로그인해주세요.');
      await logout('/solution/handle-error/login');

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
  }, [confirmPassword, handleClientSideError, logout, newPassword, originPassword]);

  return (
    <StyledForm onSubmit={onSubmit}>
      <InputText ref={originPasswordRef} value={originPassword} onChangeText={setOriginPassword} placeholder="기존비밀번호를 입력해주세요."/>
      <InputText ref={newPasswordRef} value={newPassword} onChangeText={setNewPassword} placeholder="변경하실 비밀번호를 입력해주세요."/>
      <InputText ref={confirmPasswordRef} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="비밀번호를 다시 확인해주세요."/>
      <Button type="submit">재설정</Button>
    </StyledForm>
  );
}

export const getServerSideProps = getSSPForLoggedIn;

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
