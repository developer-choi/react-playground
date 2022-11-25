import React, {useCallback} from 'react';
import {useForm, Resolver, SubmitHandler} from 'react-hook-form';
import Button from '@component/atom/button/Button';
import {numberWithComma} from '@util/extend/number';

export default function Page() {
  const {register, handleSubmit, watch} = useForm<FormValues>({resolver});

  /**
   * 1. onSubmit(): resolver에서 return한 values가 data로 들어옴. (123,456,789)
   * 2. watch(): 하지만 watch()로 접근할 경우 resolver에서 return한 values가 아니라, 입력된 값 그대로 들어옴. (123456789)
   */
  const onSubmit: SubmitHandler<FormValues> = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('price')}/>
      <span>{watch('price')}</span>
      <Button type="submit">제출</Button>
    </form>
  );
}

interface FormValues {
  price: string;
}

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
