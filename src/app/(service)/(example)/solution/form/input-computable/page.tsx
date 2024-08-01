'use client';

import React, {useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useComputableNumberInput} from '@/utils/extend/number-input';

// URL: http://localhost:3000/solution/form/input-computable
// Doc: https://docs.google.com/document/d/1kfBsghWXqD0BxyF8IVRej-0jwpl2mCXQ-LavKVh-VkM/edit
export default function Page() {
  const {register, handleSubmit} = useForm<TestFormData>();
  const priceProps = useComputableNumberInput(register('price'))
  const averageProps = useComputableNumberInput(register('average'), {decimalPlaces: 1});

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="자연수만 허용" {...priceProps}/>
      <input placeholder="소수도 허용 (1자리까지만)" {...averageProps}/>
      <button>Submit</button>
    </form>
  );
}

interface TestFormData {
  price: number;
  average: number;
}
