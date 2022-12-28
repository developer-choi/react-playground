import React, {useCallback} from 'react';
import {useForm, Resolver, SubmitHandler, RegisterOptions, SubmitErrorHandler} from 'react-hook-form';
import Button from '@component/atom/element/Button';
import {numberWithComma} from '@util/extend/number';

export default function Page() {
  const {register, handleSubmit, watch} = useForm<FormValues>({resolver});

  /**
   * 1. onSubmit(): resolver에서 return한 values가 data로 들어옴. (123,456,789)
   * 2. watch(): 하지만 watch()로 접근할 경우 resolver에서 return한 values가 아니라, 입력된 값 그대로 들어옴. (123456789)
   */
  const onSubmit: SubmitHandler<FormValues> = useCallback((data) => {
    console.log('SUBMIT', data);
  }, []);

  const onError: SubmitErrorHandler<FormValues> = useCallback((errors) => {
    alert(errors.price?.message as string);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register('price', OPTIONS)}/>
      <span>{watch('price')}</span>
      <Button type="submit">제출</Button>
    </form>
  );
}

interface FormValues {
  price: string;
}

/**
 * resolver를 useForm에 전달한 순간부터 이 OPTIONS는 무시됨.
 * 넣으나 빼나 의미가없음 동작을 안함.
 * 입력 아무것도 안하고 제출 해도 제출이 되고,
 * 최대길이 넘겨서 제출해도 제출 다됨.
 * 쓰는 순간부터 모든 유효성검증 직접해야함.
 */
const OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: '필수로 입력해야함'
  },
  maxLength: {
    value: 5,
    message: '5자리 이상 입력하면안됨'
  }
};

/**
 * 1. 제출했을 때 1회 호출되고,
 * 2. 최초 제출 이후에는 입력값 onChange() 호출될 때마다 resolver도 호출됨.
 */
const resolver: Resolver<FormValues> = async (values, context, options) => {
  console.log('resolver call', values, context, options);

  return {
    values: values.price ? {price: numberWithComma(values.price)} : {},
    errors: {}
  };
};
