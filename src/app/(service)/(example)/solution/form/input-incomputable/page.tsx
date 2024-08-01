'use client';

import {SubmitHandler, useForm} from 'react-hook-form';
import {useCallback} from 'react';
import {useIncomputableNumberInputRegister} from '@/utils/extend/number-input';

// URL: http://localhost:3000/solution/form/input-incomputable
// Doc: https://docs.google.com/document/d/1jtcpSsIsyWcB37veGDasdOzLf1yZxXB2iQxuduNdY2U/edit#heading=h.mfqj3z804pdr
export default function Page() {
  const {register, handleSubmit} = useForm<TestFormData>();
  const phoneProps = useIncomputableNumberInputRegister(register, 'phone', {
    type: 'tel',
  });
  const passwordProps = useIncomputableNumberInputRegister(register, 'password', {
    mask: true
  });

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="숫자로된 비번" {...passwordProps}/>
      <input placeholder="휴대폰번호" {...phoneProps}/>
      <button>Submit</button>
    </form>
  );
}

interface TestFormData {
  password: string;
  phone: string;
}
