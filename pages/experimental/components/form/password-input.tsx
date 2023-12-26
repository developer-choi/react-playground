import React, {type ComponentProps, useCallback} from 'react';
import {type SubmitHandler, useForm, useFormState, useWatch} from 'react-hook-form';
import type {Control} from 'react-hook-form/dist/types/form';
import {useToggle} from '@util/extend/react';

// URL: http://localhost:3000/experimental/components/form/password-input
export default function Page() {
  const {register, handleSubmit, control} = useForm<TestFormData>({
    mode: 'all'
  });

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  const inputProps: ComponentProps<'input'> = {
    ...register('password', {
      required: '필수임',
      minLength: {
        value: 4,
        message: '4자 이상 입력해야함.'
      }
    }),
    placeholder: '비밀번호 입력'
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordInput control={control} name="password" inputProps={inputProps}/>
    </form>
  );
}

interface TestFormData {
  password: string;
}

/**
 * 기존 props였음.
 * 1. 패스워드 보이기 안보이기 state를 왜 부모에서 소유해야하는지 이해가안갔음. 패스워드 보이기 숨기기 상태에 따라 변해야하는 UI의 범위는 <input> 까지밖에 없으므로 그 소유는 자식컴포넌트에서하는게 맞음.
 * 2. 성공값, 에러메시지를 패스워드값에 따라 따지는건 충분히 자식컴포넌트에서도 할 수 있음.
 */
export interface LegacyPasswordInputProp {
  inputProps: ComponentProps<'input'>;
  toggleShowPassword: () => void;
  showPassword: boolean;
  isSuccess?: boolean;
  errorMessage: string | undefined;
}

interface PasswordInputProp<N extends string, T extends Record<N, string | undefined>> {
  name: N;
  control: Control<T>;
  inputProps: Omit<ComponentProps<'input'>, 'type'>;
}

function PasswordInput<N extends string, T extends Record<N, string>>({control, name, inputProps}: PasswordInputProp<N, T>) {
  const watch = useWatch<T>({control});
  const {errors} = useFormState({control});

  const {value: visiblePassword, toggle: togglePassword} = useToggle()
  const value = watch[name] as string | undefined;
  const errorMessage = errors[name]?.message as string | undefined;
  const isSuccess = !!value && !errorMessage;

  return (
    <>
      <div>
        <input type={visiblePassword ? 'text' : 'password'} {...inputProps}/>
        <button type="button" onClick={togglePassword}>비밀번호 {visiblePassword ? '숨기기' : '보이기'}</button>
        {!isSuccess ? null : '(성공)'}
      </div>
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    </>
  );
}
