import React, {type ComponentProps, useCallback} from "react";
import {type SubmitErrorHandler, type SubmitHandler, useForm} from "react-hook-form";
import Button from "@component/atom/element/Button";
import styled from "styled-components";

// URL: http://localhost:3000/can-submit
export default function Page() {
  const {register, handleSubmit, formState} = useForm<TestFormData>();

  const onError: SubmitErrorHandler<TestFormData> = useCallback((errors) => {
    console.log("errors", errors);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback((data) => {
    console.log("data", data);
  }, []);

  const nameProps: ComponentProps<"input"> = {
    ...register("name", {
      required: {
        value: true,
        message: "필수임"
      },
      minLength: {
        value: 2,
        message: "이름은 최소 2자리이상 입력해야함"
      }
    }),
    placeholder: "이름"
  };

  const nicknameProps: ComponentProps<"input"> = {
    ...register("nickname"),
    placeholder: "닉네임"
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...nameProps} />
      <input {...nicknameProps} />
      <Button disabled={!formState.isValid}>제출</Button>
    </StyledForm>
  );
}

interface TestFormData {
  name: string;
  nickname: string;
}

const StyledForm = styled.form`
  > * {
    display: block;
  }
`;
