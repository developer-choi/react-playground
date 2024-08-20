import {FieldErrors, FieldPath, FieldValues, RegisterOptions, UseFormRegister} from 'react-hook-form';
import {InputProps} from '@/components/form/Input';

export interface UserEmailInputParam<T extends FieldValues> {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  options?: RegisterOptions<T>;
  errors: FieldErrors<T>;
}

/**
 * use[Some]Input() 에서 반황해야하는거
 * 1. RHF options (케이스별 에러메시지와 유효성검증 조건)
 * 2. label, error, placeholder
 * 3. Input type / keypad를 위한 inputMode
 *
 * use[Some]Input() 호출하는곳에서 확장해야 하는거
 * 1. autoFocus
 * 2. label / placeholder
 * 3. 기타 input props (autoComplete / autoCapitalize 등)
 * 4. useExistUserValue() (필요시)
 */
export function useEmailInput<T extends FieldValues>(param: UserEmailInputParam<T>) {
  const { register, name, options, errors } = param;

  const { validate, ...rest } = options ?? {};
  const error = errors[name];

  const inputProps: InputProps = {
    ...register(name, {
      required: TEXTS.error.required,
      validate: {
        pattern: (value) => {
          // 여기에 기획 이메일 규칙 추가
          if (value.includes('@')) {
            return true;
          } else {
            return TEXTS.error.syntax;
          }
        },
        ...validate,
      },
      ...rest,
    }),
    label: TEXTS.label,
    error: error?.message as string | undefined,
    placeholder: TEXTS.placeholder,
  };

  return {
    inputProps,
    apiErrorRecord: {
      notMatched: '존재하지않는 이메일입니다.'
    },
  };
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const TEXTS = {
  error: {
    required: '이메일을 입력해주세요.',
    syntax: '이메일 형식이 유효하지않습니다.'
  },
  label: '이메일',
  placeholder: '이메일을 입력해주세요.'
};
