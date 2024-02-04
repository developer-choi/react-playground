import React, {useCallback} from 'react';
import {useMutation} from '@tanstack/react-query';
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';

/**
 * URL: http://localhost:3000/study/rhf/reset-error/best
 *
 * 가장 베스트는 mutation.reset()을 쓰지않고
 * rhf의 setError()를 사용하는것.
 */
export default function Page() {
  const mutation = useMutation(postApi);
  const {register, handleSubmit, formState: {errors}, setError, clearErrors} = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = useCallback(async data => {
    try {
      await mutation.mutateAsync(data);
    } catch (error: any) {
      setError('name', {
        message: error.message,
        type: 'api'
      });
    }
  }, [mutation, setError]);

  const resetError = useCallback(() => {
    clearErrors('name');
  }, [clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')}/>
      <button>제출</button>
      <button type="button" onClick={resetError}>리셋</button>
      {!errors.name ? null : (
        <div>{errors.name.message}</div>
      )}
    </form>
  );
}

async function postApi(formData: FormData) {
  return Promise.reject({
    message: '잘못됨'
  });
}

interface FormData {
  name: string;
}
