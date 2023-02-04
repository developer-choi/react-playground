import React, {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import Button from '@component/atom/element/Button';

export default function Page() {
  const {register, watch, setValue} = useForm<Data>();

  const setValuePart = useCallback(() => {
    setValue('part', {name: 'hello'});
  }, [setValue]);

  const setValuePartName = useCallback(() => {
    setValue('part.name', 'hello');
  }, [setValue]);

  useEffect(() => {
    // watch를 이렇게 쓰면 setValue part.name로 할때만 리렌더링되고, setValue part로 할때는 리렌더링안됨.
    console.log('re-render', watch('part.name'));

    // watch를 이렇게 쓰면 part.name을 setValue하던 part를 setValue하건 리렌더링됨.
    // console.log('re-render', watch('part'));
  }, [watch]);

  return (
    <>
      <Button onClick={setValuePart}>CLICK ME (set value part)</Button>
      <Button onClick={setValuePartName}>Set value part.name</Button>
      <input {...register('part.name')}/>
    </>
  );
}

interface Data {
  part: {
    name: string;
  };
}
