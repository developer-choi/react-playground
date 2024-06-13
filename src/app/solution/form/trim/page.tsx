'use client';

import React, {useCallback} from 'react';
import type {RegisterOptions, SubmitErrorHandler, SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {trimObject} from '@/utils/extend/data-type/object';
import {baseHandleErrors, validateTrim} from '@/utils/extend/third-party/react-hook-form';

/**
 * URL: http://localhost:3000/solution/form/trim
 *
 * 문자열 양옆에 공백을 제거하려면 2가지 기술이 필요
 * 1. 입력할 떄 유효성 검증해서 제출못하게 막아야 ("   " 이렇게 해놓고 제출하면 막아야)
 * 2. 제출할 때 앞뒤 공백 잘라서 제출시켜야 (" a ") ==> "a"
 */
export default function Page() {
  const {register, handleSubmit} = useForm<TestFormData>();

  const onError: SubmitErrorHandler<TestFormData> = useCallback(({name}) => {
    baseHandleErrors([name]);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('submit', trimObject(data));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register('name', options)}/>
    </form>
  );
}

interface TestFormData {
  name: string;
}

const options: RegisterOptions = {
  required: {
    value: true,
    message: '이름은 필수입니다.'
  },
  validate: {
    notSpace: validateTrim('이름은 필수입니다. (공백입력했음)')
  }
};
