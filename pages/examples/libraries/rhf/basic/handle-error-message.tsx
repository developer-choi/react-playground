import React, {useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';
import styled from 'styled-components';

interface Data {
  title: string;
  nickname: string;
}

export default function Page() {
  const {register, handleSubmit, formState: {errors}} = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', VALUE_OPTIONS)}/>
      {errors.title?.message && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      <input {...register('nickname', NICKNAME_OPTIONS)}/>
      {errors.nickname?.message && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
      <button>제출</button>
    </form>
  );
}

const VALUE_OPTIONS: RegisterOptions<Data> = {
  required: {
    value: true,
    message: '필수값임'
  },
  maxLength: {
    value: 5,
    message: '5자리까지만 가능함.'
  }
};

const NICKNAME_OPTIONS: RegisterOptions<Data> = {
  required: {
    value: true,
    message: '필수값임'
  },
  maxLength: {
    value: 4,
    message: '4자리까지만 가능함'
  }
};

const ErrorMessage = styled.span`
  color: red;
`;
