import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import React, {ComponentPropsWithoutRef, useCallback} from 'react';
import Button from '@component/atom/element/Button';

/**
 * URL: http://localhost:3000/study/rhf/resgister/disabled
 *
 * 테스트방법
 * 1. 그냥 바로 제출눌러본다 ==> name키에 들어간 값은 undefined (심지어 defaultValue설정했음에도 undefined)
 * 2. Set manually 버튼 누르고나서 제출버튼 눌러본다 ==> name 키에 문자열값이 들어감.
 */

export default function Home() {
  const {register, handleSubmit, setValue} = useForm<TestFormData>({
    defaultValues: {
      name: 'test'
    }
  });

  const inputProps: ComponentPropsWithoutRef<'input'> = {
    ...register('name', {
      required: {
        value: true,
        message: '이름은 필수임'
      },
      disabled: true,
    }),
  };

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    console.error(errors);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  const setManually = useCallback(() => {
    setValue('name', 'manual setting');
  }, [setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input {...inputProps}/>
        <Button type="submit">제출</Button>
      </form>
      <Button onClick={setManually}>Set manually</Button>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {}
  };
}

interface TestFormData {
  name: string;
}