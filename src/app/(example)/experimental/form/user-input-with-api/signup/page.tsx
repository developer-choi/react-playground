'use client';

import {useCallback} from 'react';
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {useUserFieldApiValidation} from '@/utils/service/user/api-validation';
import Input, {InputProps} from '@/components/form/Input';
import {useEmailInput} from '@/utils/service/user/fields/email';
import Button from '@/components/element/Button';
import HiddenInput from '@/components/form/Input/HiddenInput';

// URL: http://localhost:3000/experimental/form/user-input-with-api/signup
// Doc: [Handle member input] https://docs.google.com/document/d/1O0UMNf505xpytsAAUlKFr29rMmj5XvdP8Gr1uP9l4-s/edit#heading=h.dbl5hy7qrxlu
// Doc: [HiddenInput] https://docs.google.com/document/d/11GkQkim2_x9jiADwnyzNhzTPBQfx6qiTsi1AVmhZ3P0/edit
export default function Page() {
  const {inputProps, validatedProps, form} = useSignUpForm();

  return (
    <form onSubmit={form.onSubmit}>
      <Input {...inputProps.email}/>
      <HiddenInput {...validatedProps.email}/>
      <Button type="submit" loading={form.isLoading}>Submit</Button>
    </form>
  );
}

function useSignUpForm() {
  // 원래 내 이름값, API에서 받아온 값이어야하고, 내정보수정 에서만 전달하면됨.
  const initial = {
    email: 'hong@gildong.com'
  };

  const methods = useForm<TestFormData>({
    defaultValues: {
      email: initial.email,
      validated: {
        email: false
      }
    },
  });

  const {register, handleSubmit, formState: {errors}} = methods;

  const emailInputProps: InputProps = {
    // 회원가입에서는 그대로 쓰고 (required true) / 수정에서는 required false로 옵션만 커스텀하면됨.
    ...useEmailInput({errors, name: 'email', register}),
    autoComplete: 'email',
    autoFocus: true,
  };

  const {errorMessage, isLoading} = useUserFieldApiValidation({
    form: {
      methods,
      fieldName: 'email',
      validationFieldName: 'validated.email',
      initialValue: initial.email
    },
    apiConfig: {
      type: 'email',
      validationMode: 'does-not-exist',
      onlyActiveUser: false // 회원가입에서는 false, 비번찾기에서는 true
    }
  });

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    console.error('errors', errors)
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    if (isLoading) {
      return;
    }

    console.log('data', data);
  }, [isLoading]);

  return {
    form: {
      onSubmit: handleSubmit(onSubmit, onError),
      isLoading
    },
    inputProps: {
      email: {
        ...emailInputProps,
        error: errorMessage
      }
    },
    validatedProps: {
      email: register('validated.email', {required: '이메일이 중복인지 확인해주세요'})
    }
  };
}

interface TestFormData {
  email: string;
  validated: {
    email: boolean;
  };
}
