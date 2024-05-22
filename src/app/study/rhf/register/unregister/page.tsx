'use client';

import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {useCallback, useEffect} from 'react';

/**
 * URL : http://localhost:3000/study/rhf/register/unregister
 */
export default function Home() {
  const {register, handleSubmit, watch, unregister} = useForm<TestFormData>({
    defaultValues: {
      enable: true
    }
  });

  const enable = watch('enable');

  useEffect(() => {
    if (!enable) {
      // 이거 안하면 제출할 때 text값이 들어가버리는 문제가 생김.
      // 그대신 이거 하면, 제출할 때 키값 자체가 빠짐. undefined 안나오고
      unregister('text');
    } else {
      // third-party library는 여기서 직접 register 다시 해줘야함
    }
  }, [enable, unregister]);

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    console.error(errors.text);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input type="checkbox" {...register('enable')}/>
      {watch('enable') ? <input {...register('text', {required: '필수임'})} /> : null}
      <button>제출</button>
    </form>
  );
}

interface TestFormData {
  text: string;
  enable: boolean;
}
