import {
  FieldPath,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError
} from 'react-hook-form';
import {UserInputParam} from '@/utils/service/user/fields/email';
import {InputProps} from '@/components/form/Input';

/**
 * Doc : https://docs.google.com/document/d/1YpwgJ2PoG2MfD6S9NDppZUGUgG_71UxbsGNXARkFGiE/edit?pli=1#heading=h.928v2tsf8s16
 *
 * 유효성검증을 하지않는 비밀번호 <input>의 react-hook-form options를 반환.
 *
 * 대부분의 페이지에서는 사이트마다 비밀번호정책에 맞는 다양한 유효성검증을 거치고있지만,
 *
 * 1. 로그인페이지
 * 2. 마이페이지 회원 재확인 (내정보수정 들어가기 직전)
 * 3. 회원용 비번변경 > 기존비번
 * 에서는 과거 정책이 어땠는지에 따라 알 수 없는 부분이 있어서 이런경우 필수여부만 체크하는경우가 있음.
 */
export function getPurePasswordInputProps<T extends FieldValues>({name, options, errors, register}: UserInputParam<T>): InputProps {
  return {
    ...register(name, {
      required: TEXT.error.required,
      ...options
    }),
    type: 'password',
    label: TEXT.label,
    placeholder: TEXT.placeholder,
    error: errors[name]?.message as string | undefined
  };
}

export interface PasswordWithConfirmInputParam<T extends FieldValues> extends UserInputParam<T> {
  confirmFormName: FieldPath<T>;
  setError: UseFormSetError<T>;
  getValues: UseFormGetValues<T>;
  clearErrors: UseFormClearErrors<T>;
}

/**
 * 하단에 확인용 비밀번호가 붙어있는 "기본" 비밀번호의 inputProps를 반환하는 함수입니다.
 * 확인용 비밀번호는 하단 getConfirmPasswordInputProps()를 사용하시면됩니다.
 *
 * 만약 로그인 페이지처럼 비밀번호 입력란이 단독으로 있는 경우에는 getPurePasswordInputProps()를 사용합니다.
 */
export function getPasswordInputPropsWithConfirm<T extends FieldValues>({confirmFormName, setError, getValues, clearErrors, options = {}, ...rest}: PasswordWithConfirmInputParam<T>) {
  const { validate, ...restOptions } = options;

  const passwordInputProps = getPurePasswordInputProps({
    ...rest,
    options: {
      validate: {
        notEqual: (value) => {
          const confirmValue = getValues(confirmFormName);

          //[비밀번호] 입력하고, [비밀번호 확인] 입력한 후 [비밀번호]를 다시 수정했을 때 예외처리 추가
          if (confirmValue && value !== confirmValue) {
            setError(confirmFormName, {
              type: 'notEqual',
              message: TEXT.error.notEqual,
            });
          } else {
            clearErrors(confirmFormName);
          }

          return true;
        },
        ...validate,
      },
      ...restOptions,
    },
  });

  return {
    ...passwordInputProps,
    hiddenErrorMessage: true, // 비번이 따닥 붙어있는 경우, 디자인에서 에러메시지를 안보이게 노출하고 2개 인풋 합쳐서 노출해달라고 했다고 가정
  };
}

export interface ConfirmPasswordInputParam<T extends FieldValues> extends UserInputParam<T> {
  passwordValue: string | undefined;
}

// 확인용 비밀번호 인풋에서 사용
export function getConfirmPasswordInput<T extends FieldValues>({options = {}, passwordValue, ...rest}: ConfirmPasswordInputParam<T>) {
  const { validate, ...restOptions } = options;

  const passwordInputProps = getPurePasswordInputProps({
    ...rest,
    options: {
      validate: {
        notEqual: (value) => {
          if (!value || passwordValue === value) {
            return true;
          } else {
            return TEXT.error.notEqual;
          }
        },
        ...validate,
      },
      ...restOptions,
    },
  });

  return {
    ...passwordInputProps,
    hiddenErrorMessage: true, // 비번이 따닥 붙어있는 경우, 디자인에서 에러메시지를 안보이게 노출하고 2개 인풋 합쳐서 노출해달라고 했다고 가정
  }
}

// 필기는 이메일쪽 파일 참고
export const PASSWORD_TEXT = {
  notFound: '비밀번호를 다시 확인해주세요.'
};

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const TEXT = {
  label: '비밀번호',
  placeholder: '비밀번호를 입력해주세요.',
  error: {
    required: '비밀번호는 필수입니다.',
    notEqual: '비밀번호가 일치하지 않습니다.'
  }
};