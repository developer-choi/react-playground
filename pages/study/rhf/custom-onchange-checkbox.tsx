import React, {ChangeEvent, ComponentPropsWithoutRef, forwardRef, Ref, useCallback} from "react";
import {SubmitHandler, useForm} from 'react-hook-form';

/**
 * 1. onChange를 커스텀하는 방법은, register('name', {onChange: ...})임. (공식문서 소개)
 * 2. 하지만 onChange Props를 사용하면 rhf에서 컨트롤 못해줌.
 * 2. 그래서 공식문서대로 하면 또 문제가 생김.
 * 3. 그래서 2가지 방법을 반반섞음.
 */

// URL: http://localhost:3000/study/rhf/custom-onchange-checkbox
export default function Page() {
  return (
    <InvalidForm/>
  )
}

/**
 * 일단 onChange를 커스텀할 때, customOnChange 콜백을 onChange Props로 직접 전달하면 안됨.
 * 사용자가 apple, kiwi를 누르면 체크는 되지만, 정작 rhf 연동이 하나도 안됨. (watch()로 데이터 못가져옴)
 */
function InvalidForm() {
  const {handleSubmit, register, watch} = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = useCallback(data => {
    console.log('submit', data);
  }, []);

  const onChangeApple = useCallback(() => {
    console.log('onChangeApple');
  }, []);

  const onChangeKiwi = useCallback(() => {
    console.log('onChangeKiwi');
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FruitCheckbox fruit="apple" {...register('fruit')} onChange={onChangeApple}/>
      <FruitCheckbox fruit="kiwi" {...register('fruit')} onChange={onChangeKiwi}/>
      <div>
        값 = {watch().fruit?.join(', ')}
      </div>
    </form>
  );
}

/**
 * InvalidForm 주석참고)
 * 그래서 공식문서 말 그대로 register()의 2nd parameter로 전달해보면,
 * apple을 체크해도 banana콜백이 실행되고,
 * kiwi를 체크해도 banana콜백이 실행됨.
 * (버그 규칙: input의 이름이 모두 같으면서 제일 마지막으로 등록한 체크박스의 onChange로 전달한 콜백이 실행됨)
 * (그대신 rhf연동자체는 됐기때문에, 체크한 체크박스 그 자체는 watch()로 데이터 잘 들어감)
 *
 * 근데 위 버그가 문제되는 경우는 바로 카테고리필터임.
 *
 * 남성 체크박스
 * 남성 체크박스 > 남성아우터 체크박스
 * 남성 체크박스 > 남성신발 체크박스
 * 여성 체크박스
 * 여성 체크박스 > 여성아우터 체크박스
 * 여성 체크박스 > 여성신발 체크박스
 *
 * 이렇게 있는 상황에서 남성 체크하면, 제일 마지막으로 등록한 여성 체크박스 > 여성신발 체크박스의 onChange가 실행되기때문에,
 * 남성은 체크될지언정(누른 체크박스는 rhf연동됐으니 체크되긴함)
 * 남성밑에있는 남성아우터, 남성신발은 체크안됨. (남성 체크박스의 onChange가 실행되야 그 밑에있는 자식들까지도 재귀적으로 다 찾아서 체크시킬수있는데...)
 */
function BugForm() {
  const {handleSubmit, register, watch} = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = useCallback(data => {
    console.log('submit', data);
  }, []);

  const onChangeApple = useCallback(() => {
    console.log('onChangeApple');
  }, []);

  const onChangeKiwi = useCallback(() => {
    console.log('onChangeKiwi');
  }, []);

  const onChangeBanana = useCallback(() => {
    console.log('onChangeBanana');
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FruitCheckbox fruit="apple" {...register('fruit', {onChange: onChangeApple})}/>
      <FruitCheckbox fruit="kiwi" {...register('fruit', {onChange: onChangeKiwi})}/>
      <FruitCheckbox fruit="banana" {...register('fruit', {onChange: onChangeBanana})}/>
      <div>
        값 = {watch().fruit?.join(', ')}
      </div>
    </form>
  );
}

/**
 * InvalidForm 주석 참고)
 * 그래서 내 방법, 라이브러리 안내방법 둘다 반반 섞어서,
 * custom onChange 콜백을 register 2nd parameter에는 전달하지않되
 * register의 반환값의 onChange값을 내부적으로 호출하도록 했음.
 */
function NonBugForm() {
  const {handleSubmit, register, watch} = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = useCallback(data => {
    console.log('submit', data);
  }, []);

  const {onChange: onChangeNative, ...rest} = register('fruit');

  const onChangeApple = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeNative(event);
    console.log('onChangeApple');
  }, [onChangeNative]);

  const onChangeKiwi = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeNative(event);
    console.log('onChangeKiwi');
  }, [onChangeNative]);

  const onChangeBanana = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeNative(event);
    console.log('onChangeBanana');
  }, [onChangeNative]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FruitCheckbox fruit="apple" {...rest} onChange={onChangeApple}/>
      <FruitCheckbox fruit="kiwi" {...rest} onChange={onChangeKiwi}/>
      <FruitCheckbox fruit="banana" {...rest} onChange={onChangeBanana}/>
      <div>
        값 = {watch().fruit?.join(', ')}
      </div>
    </form>
  );
}

interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  fruit: Fruit
}

const FruitCheckbox = forwardRef(function FruitCheckbox({fruit, ...rest}: CheckboxProps, ref: Ref<HTMLInputElement>) {
  return (
    <label>
      <input ref={ref} type="checkbox" value={fruit} {...rest}/>
      {fruit}
    </label>
  )
})

interface Data {
  fruit: Fruit[];
}

export type Fruit = 'apple' | 'banana' | 'kiwi'
