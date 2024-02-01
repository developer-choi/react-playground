import React, {forwardRef, type Ref} from "react";
import {useForm, useFormState, useWatch} from "react-hook-form";
import type {Control} from "react-hook-form/dist/types/form";
import {useToggle} from "@util/extend/react";

/**
 * URL: http://localhost:3000/study/react/forward-ref/generic
 * forwardRef는 generic을 적용할 수 없음. 이건 ㄹㅇ루 진짜가 맞음.
 * https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
 *
 * 그래서 다양한 방식이 있음.
 * 나는 그중에 assertion을 통해 해결하려고 했는데,
 * 위에 소개된 방식보다 내 방식이 더 적은 코드로 이해하기쉽게 해결할 수 있다고 생각함. (as typeof PasswordInput)
 */
export default function Page() {
  const {control} = useForm<TestFormData>();

  return (
    <>
      <PasswordInput control={control} name="password" />

      {/* 이 control부분 any 빼면 타입에러남. 난 분명 Record<N, string>으로 잡았는데 타입추론은 Record<string, string>으로 됨. */}
      <ForwardRefPasswordInput control={control as any} name="password" />
      <TypeSafeForwardRefPasswordInput control={control} name="password" />
    </>
  );
}

interface TestFormData {
  password: string;
}

interface PasswordInputProp<N extends string, T extends Record<N, string | undefined>> {
  name: N;
  control: Control<T>;
}

function PasswordInput<N extends string, T extends Record<N, string>>({control, name}: PasswordInputProp<N, T>) {
  const watch = useWatch<T>({control});
  const {errors} = useFormState({control});

  const {value: visiblePassword} = useToggle();
  const value = watch[name] as string | undefined;
  const errorMessage = errors[name]?.message as string | undefined;
  const isSuccess = !!value && !errorMessage;

  return (
    <div>
      <input type={visiblePassword ? "text" : "password"} />
      {!isSuccess ? "" : "성공"}
    </div>
  );
}

function PasswordInputWithForwardRef<N extends string, T extends Record<N, string>>({control, name}: PasswordInputProp<N, T>, ref: Ref<HTMLInputElement>) {
  const watch = useWatch<T>({control});
  const {errors} = useFormState({control});

  const {value: visiblePassword} = useToggle();
  const value = watch[name] as string | undefined;
  const errorMessage = errors[name]?.message as string | undefined;
  const isSuccess = !!value && !errorMessage;

  return (
    <div>
      <input ref={ref} type={visiblePassword ? "text" : "password"} />
      {!isSuccess ? "" : "성공"}
    </div>
  );
}

const ForwardRefPasswordInput = forwardRef(PasswordInputWithForwardRef);
const TypeSafeForwardRefPasswordInput = forwardRef(PasswordInput) as typeof PasswordInput;
