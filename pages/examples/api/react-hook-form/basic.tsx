import React, {useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

export default function Page() {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<Data>();

  const onSubmit = useCallback<SubmitHandler<Data>>((data) => {
    console.log(data);
  }, []);

  console.log('re-render'); //이렇게 watch('example) or watch('exampleRequired') 없으면 리렌더링 안됨.
  // console.log('re-render', watch('example')); //이런경우 example이 바뀌었을 때만 리렌더링됨.

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register('example')}/>
      <input {...register('exampleRequired', {required: true})}/>
      {errors.exampleRequired && <span>This field is required</span>}
      <button>submit</button>
    </form>
  );
}

interface Data {
  example: string;
  exampleRequired: boolean;
}
