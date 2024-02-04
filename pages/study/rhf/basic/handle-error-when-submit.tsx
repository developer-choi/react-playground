import React, {useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import type {SubmitErrorHandler} from 'react-hook-form/dist/types/form';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';
import {baseHandleErrors} from '@util/extend/react-hook-form';

export default function Page() {
  const {register, handleSubmit} = useForm<Data>();

  //submit 이벤트가 발생했을 때 error가 발생하면 호출됨.
  const onError: SubmitErrorHandler<Data> = useCallback(({title, content}) => {
    baseHandleErrors([title, content]);
  }, []);

  //submit 이벤트가 발생했을 때 error가 발생하면 호출 안됨.
  const onSubmit: SubmitHandler<Data> = useCallback((data) => {
    console.log('submit', data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register('title', TITLE_OPTIONS)}/>
      <textarea {...register('content', CONTENT_OPTIONS)}/>
      <select {...register('qnaType')}>
        <option value="a">문의타입 A</option>
        <option value="b">문의타입 B</option>
        <option value="c">문의타입 C</option>
      </select>
      <button>저장</button>
    </form>
  );
}

interface Data {
  title: string;
  content: string;
  qnaType: 'a' | 'b' | 'c';
}

const TITLE_OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: '제목입력해야함'
  },
  maxLength: {
    value: 20,
    message: '최대길이 20임'
  },
};

const CONTENT_OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: '내용입력해야함'
  },
  maxLength: {
    value: 100,
    message: '최대길이 100임'
  }
};
