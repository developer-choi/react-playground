import styled from 'styled-components';
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {useCallback} from 'react';
import Button from '@component/atom/element/Button';
import {baseHandleErrors} from '@util/extend/react-hook-form';
import HiddenInput from '@component/atom/forms/HiddenInput';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';

// URL: http://localhost:3000/solution/rhf/hidden-input
export default function Page() {
  const {register, handleSubmit} = useForm<TestFormData>({
    shouldFocusError: false
  });

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    baseHandleErrors([errors.validated]);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('onSubmit', data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box/>
      <HiddenInput {...register('validated', VALIDATED_NICKNAME_OPTIONS)}/>
      <input style={{border: '2px solid black'}} {...register('nickname', NICKNAME_OPTIONS)}/>
      <Box/>
      <Button type="submit">제출</Button>
    </form>
  );
}

const VALIDATED_NICKNAME_OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: '닉네임이 중복됨'
  }
};

const NICKNAME_OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: '닉네임은 필수임'
  }
}

interface TestFormData {
  validated: string;
  nickname: string;
}

const Box = styled.div`
  height: 1000px;
  background: bisque;
`;
