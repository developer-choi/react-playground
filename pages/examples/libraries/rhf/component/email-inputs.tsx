import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import type {SubmitHandler, UseFormRegister} from 'react-hook-form';
import {FieldPath, FieldValues, useForm} from 'react-hook-form';
import {Button} from '@component/atom/button/button-presets';

export default function Page() {
  const {register, setValue, handleSubmit} = useForm<Data>();
  const formRef = useRef<HTMLFormElement>(null);

  const setDomain = useCallback((value: string) => {
    setValue('email.domain', value);
  }, [setValue]);

  const onSubmit: SubmitHandler<Data> = useCallback(data => {
    console.log('submit', data);
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <EmailInput setDomain={setDomain} register={register} names={['email.id', 'email.domain']}/>
      <input {...register('name')}/>
      <Button type="submit">제출</Button>
    </Form>
  );
}

interface Data {
  name: string;
  email: {
    id: string;
    domain: string;
  };
}

interface EmailInputProps<T extends FieldValues, N extends FieldPath<T>> {
  register: UseFormRegister<T>;
  names: N[];
  setDomain: (domain: string) => void; // Limitation1. 이걸 받아야 Select Box 고를때마다 도메인이 입력되도록 구현가능.
}

function EmailInput<T extends FieldValues, N extends FieldPath<T>>({register, names, setDomain}: EmailInputProps<T, N>) {
  const [select, setSelect] = useState(''); // Limitation1. 이걸 받아야 Select Box 고를때마다 도메인이 입력되도록 구현가능.

  // Limitation1. 이걸 받아야 Select Box 고를때마다 도메인이 입력되도록 구현가능.
  useEffect(() => {
    setDomain(select);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  /**
   * 이 컴포넌트에서 domain input에 값을 setting할 수 있다면 setDomain()과 useEffect()는 필요없어지고,
   * 이 컴포넌트에서 현재 domain input에 값을 read할 수 있다면 select state조차도 필요없어진다.
   */

  return (
    <>
      <input {...register(names[0])}/>
      @
      <input disabled={select !== ''} {...register(names[1])}/>
      <select value={select} onChange={event => setSelect(event.target.value)}>
        <option value="naver.com">naver.com</option>
        <option value="gmail.com">naver.com</option>
        <option value="">직접 입력</option>
      </select>
    </>
  );
}

const Form = styled.form`
  display: flex;
  align-items: center;
  
  input {
    border: 1px solid black;
    padding: 5px;
  }
  
  input:disabled {
    background-color: lightgray;
  }
`;
