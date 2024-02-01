import React, {useCallback} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import type {RegisterOptions} from "react-hook-form/dist/types/validator";
import styled from "styled-components";

// URL: http://localhost:3000/study/rhf/basic/handle-error-message
interface Data {
  title: string;
  agree: boolean;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title", VALUE_OPTIONS)} />
      {errors.title?.message && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      <input type="checkbox" {...register("agree", AGREE_OPTIONS)} />
      {errors.agree?.message && <ErrorMessage>{errors.agree.message}</ErrorMessage>}
      <button>제출</button>
    </form>
  );
}

const VALUE_OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: "필수값임"
  },
  maxLength: {
    value: 5,
    message: "5자리까지만 가능함."
  }
};

/**
 * 체크박스의 value를 boolean으로 쓰는 상황에서 (예시: 약관동의)
 * 똑같이 required 옵션으로 에러메시지 다 만들 수 있다.
 */
const AGREE_OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: "약관동의 꼭 해야함."
  }
};

const ErrorMessage = styled.span`
  color: red;
`;
