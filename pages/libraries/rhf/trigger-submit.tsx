import React, {useCallback, KeyboardEvent, useRef} from 'react';
import styled from 'styled-components';
import type {RegisterOptions, SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import Button from '@component/atom/element/Button';
import type {SubmitErrorHandler} from 'react-hook-form/dist/types/form';
import {baseHandleErrors} from '@util/extend/react-hook-form';
import {isMatchKeyboardEvent} from '@util/extend/keyboard-event';

export default function Page() {
  const {register, handleSubmit} = useForm<Data>();
  const formRef = useRef<HTMLFormElement>(null);

  const onError: SubmitErrorHandler<Data> = useCallback(errors => {
    baseHandleErrors([errors.name, errors.title, errors.content]);
  }, []);

  const onSubmit: SubmitHandler<Data> = useCallback(data => {
    console.log('SUBMIT', data);
  }, []);

  const submitShortcuts = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (isMatchKeyboardEvent(event, {key: 'Enter', specialKeys: ['ctrlKey']})) {
      formRef.current?.requestSubmit();
    }
  }, []);

  return (
    <Form ref={formRef} onKeyDown={submitShortcuts} onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register('name', OPTIONS)}/>
      <input {...register('title', OPTIONS)}/>
      <textarea {...register('content', OPTIONS)}/>
      <Button type="submit">제출</Button>
    </Form>
  );
}

const OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: '입력해주세요.'
  },
  minLength: {
    value: 3,
    message: '3글자 이상 입력해주세요'
  }
};

interface Data {
  name: string;
  title: string;
  content: string;
}

const Form = styled.form`
  display: flex;
  input {
    border: 1px solid black;
    padding: 5px;
  }
`;
