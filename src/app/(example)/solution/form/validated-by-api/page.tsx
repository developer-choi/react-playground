'use client';

import {RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import React, {useCallback} from 'react';
import {baseHandleErrors} from '@/utils/extend/library/react-hook-form';
import HiddenInput from '@/components/form/input/HiddenInput';

/**
 * URL: http://localhost:3000/solution/form/validated-by-api
 * Doc : https://docs.google.com/document/d/11GkQkim2_x9jiADwnyzNhzTPBQfx6qiTsi1AVmhZ3P0/edit
 */
export default function Page() {
  const {register, handleSubmit} = useForm<TestFormData>();

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    baseHandleErrors([errors.nickname, errors.validated]);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('onSubmit', data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div style={{height: 1000, background: 'bisque'}}/>
      <input style={{border: '2px solid black'}} {...register('nickname', NICKNAME_OPTIONS)}/>
      <HiddenInput {...register('validated', VALIDATED_NICKNAME_OPTIONS)}/>
      <div style={{height: 1000, background: 'bisque'}}/>
      <button>제출</button>
    </form>
  );
}

/**
 * TODO
 * 닉네임 유효성검증 API에서 응답하는 에러메시지 종류가
 * 닉네임이 중복되요 말고 다른 케이스도 있다면,
 * 그 메시지로 커스텀이 되야하는데?
 */
const VALIDATED_NICKNAME_OPTIONS: RegisterOptions<TestFormData> = {
  required: {
    value: true,
    message: '닉네임이 중복됨'
  }
};

const NICKNAME_OPTIONS: RegisterOptions<TestFormData> = {
  required: {
    value: true,
    message: '닉네임은 필수임'
  }
}

interface TestFormData {
  validated: string;
  nickname: string;
}
