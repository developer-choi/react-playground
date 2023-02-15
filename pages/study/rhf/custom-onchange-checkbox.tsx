import React, {ChangeEvent, useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

export default function Page() {
  const {handleSubmit, register} = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = useCallback(data => {
    console.log('submit', data);
  }, []);

  const onChangeApple = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log('onChangeApple', event.target.value);
  }, []);

  /**
   * 폼에 같은 이름으로 2개이상 등록한 다음
   * onChange를 커스텀하는 경우,
   * 가장 마지막에 등록한 onChange만 호출된다.
   *
   * 그래서 apple을 체크해도 bugOnChangeBanana가 호출된다.
   * (근데 event.target.value는 apple꺼로 나옴)
   */
  const bugOnChangeBanana = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log('bugOnChangeBanana', event.target.value);
  }, []);

  /**
   * 그래서 모든 customOnChange를 얘처럼만들고 얘처럼 전달해야한다.
   */
  const {onChange: onChangeFruit, ...nonBugRest} = register('fruit');

  const nonBugOnChangeKiwi = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeFruit(event);
    console.log('nonBugOnChangeKiwi', event.target.value);
  }, [onChangeFruit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input type="checkbox" value="apple" {...register('fruit', {onChange: onChangeApple})}/>
        apple (CHECK ME)
      </label>
      <label>
        <input type="checkbox" value="kiwi" {...nonBugRest} onChange={nonBugOnChangeKiwi}/>
        kiwi
      </label>
      <label>
        <input type="checkbox" value="banana" {...register('fruit', {onChange: bugOnChangeBanana})}/>
        banana
      </label>
    </form>
  );
}

interface Data {
  fruit: ('apple' | 'banana' | 'kiwi')[];
}
