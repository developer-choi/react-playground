import React, {useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import Button from '@component/atom/element/Button';
import {useLogWhenRendering} from '@util/extend/test';

// URL: http://localhost:3000/study/rhf/basic/checkbox
export default function Page() {
  const {handleSubmit, register, watch, setValue, reset} = useForm<Data>({
    defaultValues: {
      array: [],
      bool: false,
      str: ''
    }
  });

  const onSubmit: SubmitHandler<Data> = useCallback((data) => {
    console.log('submit', data);
  }, []);

  /**
   * <input type"checkbox 에 선언한 value값이 배열에 들어가기만 해도
   * 알아서 체크박스가 체크되는것도 확인.
   */
  const setSpecial = useCallback(() => {
    setValue('array', ['special']);
  }, [setValue]);

  const setSomeStringValue = useCallback(() => {
    setValue('str', 'some-string-value');
  }, [setValue]);

  //reset하면 체크박스도 다시 다 풀림.
  const resetCheckboxes = useCallback(() => {
    reset({
      array: [],
      bool: false,
      str: ''
    })
  }, [reset]);

  /**
   * 최초렌더링 : {} 여서 array 키로 접근하면 undefined뜸.
   * 이후렌더링 : array키로 false뜸 (str 체크박스체크하면), str키도 false뜸.
   * array를 한번이상 체크하는경우 : array로 뜸 (다시 체크해제하면 빈배열뜸)
   * 위와같은 일을 안겪기 위해, defaultValue를 선언하면 매우좋음.
   */
  useLogWhenRendering('watch', watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input type="checkbox" {...register('bool')}/>
        bool
      </label>
      <label>
        <input type="checkbox" {...register('str')} value="some-string-value"/>
        some-string-value
      </label>
      <label>
        <input type="checkbox" {...register('array')} value="special"/>
        special
      </label>
      <label>
        <input type="checkbox" {...register('array')} value="non-special"/>
        non-special
      </label>
      <Button>제출</Button>
      <Button onClick={setSpecial}>setSpecial</Button>
      <Button type="button" onClick={setSomeStringValue}>setSomeStringValue</Button>
      <Button type="button" onClick={resetCheckboxes}>Reset all</Button>
    </form>
  );
}

interface Data {
  /**
   * 굳이 array[] 이런거 안써도됨, name만 같으면됨
   * form 안에 input name 같은게 두개이상이면 하나만체크해도 어레이로옴.
   */
  array: ('special' | 'non-special')[];
  str: string;
  bool: boolean;
}
