import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import React, {useCallback, useState} from 'react';
import Button from '@component/atom/element/Button';

/**
 * URL: http://localhost:3000/study/rhf/resgister/disabled
 *
 * 테스트방법
 * 1. 그냥 바로 제출눌러본다 ==> name키에 들어간 값은 undefined (심지어 defaultValue설정했음에도 undefined)
 * 2. Set manually 버튼 누르고나서 제출버튼 눌러본다 ==> name 키에 문자열값이 들어감.
 * 3. 다시 Set disabled 버튼 누르고나서 제출버튼 눌러본다 ==> undefined 다시뜸
 * 4. Set manually 버튼 누르고나서 제출버튼 눌러본다 ==> 또 다시 name 키에 문자열값이 들어감.
 *
 * ==> register('값', {dsiabled: true}) 이 함수가 실행될 때 undefined로 폼데이터값을 바꿀 수 있고, 이걸 또다시 setValue로 바꿀 수 있음.
 */

export default function Home() {
  const {register, handleSubmit, setValue} = useForm<TestFormData>({
    defaultValues: {
      name: 'test'
    }
  });

  const [inputProps, setInputProps] = useState(register('name', {
    required: {
      value: true,
      message: '이름은 필수임'
    },
  }));

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    console.error(errors);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  const setManually = useCallback(() => {
    setValue('name', 'manual setting');
  }, [setValue]);

  const setDisabled = useCallback(() => {
    setInputProps(register('name', {
      required: {
        value: true,
        message: '이름은 필수임'
      },
      disabled: true,
    }))
  }, [register]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input {...inputProps}/>
        <Button type="submit">제출</Button>
      </form>
      <Button onClick={setManually}>Set manually</Button>
      <Button onClick={setDisabled}>Set disabled</Button>
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