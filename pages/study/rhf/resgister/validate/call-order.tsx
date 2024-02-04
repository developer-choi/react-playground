import React, {useCallback} from 'react';
import type {RegisterOptions, SubmitErrorHandler, SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import Button from '@component/atom/element/Button';

/**
 * URL: http://localhost:3000/study/rhf/resgister/validate/call-order
 *
 * 닉네임 유효성검증같은 예시를 생각하며 만들었고,
 * 1. 인풋에 값 2자리 입력해보면 API로그 안찍힘. (실제로도 값이 유효해야 API 호출함)
 * 2. 세자리부터 호출로그 찍힘.
 *
 * ㅡㅡㅡㅡ 여기까지는 정상적인 동작이지만 ㅡㅡㅡㅡㅡ
 *
 * 3. 제출버튼눌러보면 호출로그 또 찍힘. (비정상적인 동작) > 실제로는 API에서 유효하다고 응답한번오면 값 바꾸지않는이상 제출할 때 중복검사 API 호출되면 안됨.
 */
export default function Page() {
  const {register, handleSubmit} = useForm<any>({
    mode: 'all'
  });

  const onError: SubmitErrorHandler<any> = useCallback(errors => {
    console.error(errors);
  }, []);

  const onSubmit: SubmitHandler<any> = useCallback(() => {
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input placeholder="닉네임 입력" {...register('name', OPTIONS)}/>
      <Button type="submit">제출</Button>
    </form>
  );
}

export async function getServerSideProps() {
  return {
    props: {}
  };
}

const OPTIONS: RegisterOptions = {
  minLength: {
    value: 3,
    message: '닉네임은 2자 이상이어야함'
  },

  /** validate() 호출시점
   * Validation은 mode가 onSubmit인 경우
   * 1. 최초제출할때 입력하는단계에서는 호출안됨
   * 2. 그러다 제출할 때 호출됨
   * 3. 제출 이후에는 입력하더라도 막 호출됨.
   *
   * ==>
   * 1. 간단한 폼의 경우 mode 기본값 그대로 써도 될거같음.
   * 2. 입력할 때 즉시 에러메시지 보여줘야하는 경우 mode는 all 쓰는게맞는듯. (ex: 비번은 이런 저런 형식으로 쓰셈)
   * (1) 2번은 쓰임새에 따라 입력할 때 말고 제출할 떄 보여주세요 (아직 입력 다 안했는데 에러메시지 보여주는거 별로에요) 하는 경우 onSubmit 유지할 수도 있지만,
   * (2) "이미 사용중인 닉네임이에요" 처럼 유효성검증을 서버를 통하는 경우는 강제로 all 써야함. 이걸 제출할 때 호출하는거는 말이안됨.
   */
  validate: {
    required: value => {
      console.log('validated > required call', value);

      return value ? true : 'validate > 필수임';
    }
  }
};
