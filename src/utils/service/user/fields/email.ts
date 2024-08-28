import {FieldErrors, FieldPath, FieldValues, RegisterOptions, UseFormRegister} from 'react-hook-form';
import {InputProps} from '@/components/form/Input';

export interface UserInputParam<T extends FieldValues> {
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
 * 4. useUserFieldApiValidation() (필요시)
 */
export function getEmailInputProps<T extends FieldValues>(param: UserInputParam<T>): InputProps {
  const { register, name, options, errors } = param;

  const { validate, ...rest } = options ?? {};
  const error = errors[name];

  return {
    ...register(name, {
      required: TEXT.error.required,
      validate: {
        pattern: (value) => {
          // 여기에 기획 이메일 규칙 추가
          if (value.includes('@')) {
            return true;
          } else {
            return TEXT.error.syntax;
          }
        },
        ...validate,
      },
      ...rest,
    }),
    type: 'email',
    label: TEXT.label,
    error: error?.message as string | undefined,
    placeholder: TEXT.placeholder,
  };
}

/**
 * 프론트 유효성검증에서는 발견되지않는 (API) 에러메시지 모음
 *
 * 만약 다국어 번역이 필요하면 useTranstions() 문법 때문에
 * 1. 저 위 getEmailInputProps()을 useEmailInput()으로 바꾸고
 * 2. 그 안에서 useTranslations()를 통해 에러메시지, 라벨, 힌트텍스트를 번역했어야함. (랭디 참고)
 */
export const EMAIL_TEXT = {
  notFound: '존재하지않는 이메일입니다.'
};

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const TEXT = {
  label: '이메일',
  placeholder: '이메일을 입력해주세요.',
  error: {
    required: '이메일을 입력해주세요.',
    syntax: '이메일 형식이 유효하지않습니다.'
  },
};
