'use client';

import React, {useCallback} from 'react';
import type {RegisterOptions, SubmitErrorHandler, SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {trimObject} from '@forworkchoe/core';
import {baseHandleErrors,} from '@/utils/extend/library/react-hook-form';
import {validateMinLengthWithTrim, validateRequiredWithTrim} from '@/utils/service/common/inputs';

/**
 * URL: http://localhost:3000/solution/form/trim
 * Doc : https://docs.google.com/document/d/1dsUhjzYW46Qq6meZ9_D0ApZnBeZLOFW2WmrxlxQ8gCk/edit#heading=h.7r6n7x8l67mo
 *
 * 문자열 양옆에 공백을 제거하려면 2가지 기술이 필요
 * 1. 입력할 떄 유효성 검증해서 제출못하게 막아야 ("   " 이렇게 해놓고 제출하면 막아야)
 * 2. 제출할 때 앞뒤 공백 잘라서 제출시켜야 (" a ") ==> "a"
 */
export default function Page() {
  const {register, handleSubmit} = useForm<TestFormData>();

  const onError: SubmitErrorHandler<TestFormData> = useCallback(({name, email}) => {
    baseHandleErrors([name, email]);
  }, []);

  // 성공 케이스에서도 코드가 2배가 되야함. 공백을 추가한 상태로 제출한 경우도 같이 체크해야하니까.
  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('submit', trimObject(data));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register('name', NAME_OPTIONS)}/>
      <input {...register('email', EMAIL_OPTIONS)}/>
      <button>Submit</button>
    </form>
  );
}

interface TestFormData {
  name: string;
  email: string;
}

const MIN_LENGTH = 3;

const NAME_OPTIONS: RegisterOptions<TestFormData> = {
  required: {
    value: true,
    message: '이름은 필수입니다.'
  },
  minLength: {
    value: MIN_LENGTH,
    message: '이름은 최소 3글자 입력해야합니다.'
  },
  // 실패 케이스에서 코드가 2배가 되야함. 기존 실패케이스 마다 공백인 케이스를 한번씩 더 체크해야하니까.
  validate: {
    required: validateRequiredWithTrim('이름은 필수입니다.'),
    minLength: validateMinLengthWithTrim(MIN_LENGTH, '이름은 최소 3글자 입력해야합니다.')
  }
};

const EMAIL_OPTIONS: RegisterOptions<TestFormData> = {
  required: {
    value: true,
    message: '이름은 필수입니다.'
  },
  validate: {
    required: validateRequiredWithTrim('이름은 필수입니다.'),
    regex: value => {
      const trimmedValue = value.trim();

      if (trimmedValue.includes('@')) {
        return true;

      } else {
        return '이메일 형식이 올바르지 않습니다.'
      }
    }
  }
};
