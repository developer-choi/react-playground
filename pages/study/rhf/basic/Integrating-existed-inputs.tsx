import React, {useCallback} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import type {SubmitErrorHandler} from 'react-hook-form/dist/types/form';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';
import InputComputableNumber from '@component/extend/InputComputableNumber';

export default function Page() {
  const {handleSubmit, setFocus, setValue, control} = useForm<Product>({
    defaultValues: {
      price: ''
    }
  });

  const focus = useCallback(() => {
    setFocus('price');
  }, [setFocus]);

  const onSubmit: SubmitHandler<Product> = useCallback((data) => {
    console.log('submit', data);
  }, []);

  const onError: SubmitErrorHandler<Product> = useCallback((errors) => {
    console.log('error', errors);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Controller
        name="price"
        control={control}
        rules={PRICE_OPTIONS}
        render={({field: {onChange, ...rest}}) => (
          <InputComputableNumber enableComma enableDecimal={false} onChangeText={text => setValue('price', text)} {...rest} />
        )}
      />
      <button type="button" onClick={focus}>포커스</button>
      <button>제출</button>
    </form>
  );
}

interface Product {
  price: string;
}

const PRICE_OPTIONS: RegisterOptions<Product> = {
  required: {
    value: true,
    message: '입력해야함'
  },
  maxLength: {
    value: 20,
    message: '최대길이 20임'
  }
};
