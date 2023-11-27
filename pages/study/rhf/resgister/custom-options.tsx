import React, {useCallback} from 'react';
import type {FieldPath, RegisterOptions, SubmitErrorHandler, SubmitHandler, UseFormReturn} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import type {FieldValues} from 'react-hook-form/dist/types/fields';
import Button from '@component/atom/element/Button';
import {baseHandleErrors, getRequiredOptions} from '@util/extend/react-hook-form';

/**
 * URL: http://localhost:3000/study/rhf/resgister/custom-options
 * 회원정보 수정페이지를 가정하고 만든 페이지임
 *
 * Case1. 아무것도 입력안하고 제출버튼 누르는경우 ==> 제출 잘됨
 * Case2. 위에꺼 입력, 아래꺼 좀 다르게입력하면 아래꺼에 에러메시지 잘 표기됨
 *
 * (예외케이스) Case3. 위에꺼 입력, 아래꺼 똑같이 입력 후 위에꺼 한글자 바꾸는경우 ==> 아래꺼에 에러메시지 잘 표기됨
 */
export default function Page() {
  const methods = useForm<EditMemberInfoFormData>({
    mode: 'all'
  });

  const onError: SubmitErrorHandler<EditMemberInfoFormData> = useCallback(({password, passwordConfirm}) => {
    baseHandleErrors([password, passwordConfirm]);
  }, []);

  const onSubmit: SubmitHandler<EditMemberInfoFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  const passwordOptions = methods.register('password', getPasswordOptions({
    methods,
    confirmPasswordRegisterName: 'passwordConfirm',
    customOptions: {required: false}
  }));

  const passwordConfirmOptions = methods.register('passwordConfirm', getPasswordConfirmOptions({
    methods,
    passwordRegisterName: 'password',
    customOptions: {required: false}
  }));

  return (
    <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
      <div><input {...passwordOptions}/></div>
      <div>{methods.formState.errors.password?.message}</div>
      <div><input {...passwordConfirmOptions}/></div>
      <div>{methods.formState.errors.passwordConfirm?.message}</div>
      <Button type="submit">제출</Button>
    </form>
  );
}

interface EditMemberInfoFormData {
  password: string;
  passwordConfirm: string;
}

// 비밀번호 확인이랑 같이 쓰는 경우의 옵션
interface PasswordCustomOptionParam<T extends FieldValues> {
  confirmPasswordRegisterName: FieldPath<T>;
  methods: Pick<UseFormReturn<T>, 'getValues' | 'setError' | 'clearErrors'>;
  customOptions?: RegisterOptions;
}

function getPasswordOptions<T extends FieldValues>({methods, confirmPasswordRegisterName, customOptions}: PasswordCustomOptionParam<T>): RegisterOptions {
  const {required, validate, ...rest} = customOptions ?? {};
  const resultRequired = getRequiredOptions(required) ?? {
    value: true,
    message: '비밀번호는 필수 입력 항목입니다.',
  };

  return {
    required: resultRequired,
    minLength: {
      value: 10,
      message: '10자리 이상 입력해주세요.',
    },
    validate: {
      notEqual: (value) => {
        if (resultRequired.value && !value) {
          return true;
        }

        const confirmValue = methods.getValues(confirmPasswordRegisterName);

        //[비밀번호] 입력하고, [비밀번호 확인] 입력한 후 [비밀번호]를 다시 수정했을 때 예외처리 추가
        if (confirmValue && value !== confirmValue) {
          methods.setError(confirmPasswordRegisterName, {
            type: 'notEqual',
            message: '비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
          });
        } else {
          methods.clearErrors(confirmPasswordRegisterName);
        }

        return true;
      },
      ...validate
    },
    ...rest
  };
}

interface PasswordConfirmOptionParam<T extends FieldValues> {
  passwordRegisterName: FieldPath<T>; // 비밀번호 확인이 아닌 비밀번호의 registerName
  methods: Pick<UseFormReturn<T>, 'getValues' | 'setError' | 'clearErrors'>;
  customOptions?: RegisterOptions;
}

function getPasswordConfirmOptions<T extends FieldValues>({passwordRegisterName, customOptions, methods}: PasswordConfirmOptionParam<T>): RegisterOptions {
  const {required, validate, ...rest} = customOptions ?? {};
  const resultRequired = getRequiredOptions(required) ?? {
    value: true,
    message: '비밀번호 확인은 필수 입력 항목입니다.',
  };

  return {
    required: resultRequired,
    validate: {
      notEqual: (value) => {
        if (resultRequired.value && !value) {
          return true;
        }

        if (methods.getValues(passwordRegisterName) === value) {
          return true;
        } else {
          return '비밀번호가 일치하지 않습니다. 다시 확인해주세요.';
        }
      },
      ...validate
    },
    ...rest
  };
}