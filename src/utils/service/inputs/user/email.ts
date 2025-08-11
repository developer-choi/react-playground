import {FieldValues} from 'react-hook-form';
import {InputProps} from '@/components/form/Input';
import {FormInputParam} from '@/utils/service/inputs';
import {getMessageFromFieldErrors} from '@/utils/extend/library/react-hook-form';

export function getEmailInputProps<T extends FieldValues>(param: FormInputParam<T>): InputProps {
  const {texts, form: {name, methods, options, props}} = param;

  const {validate, ...rest} = options ?? {};

  return {
    ...methods.register(name, {
      required: texts?.required ?? '이메일을 입력해주세요.',
      validate: {
        pattern: (value) => {
          // 여기에 기획 이메일 규칙 추가
          if (value.includes('@')) {
            return true;
          } else {
            return '이메일 형식이 유효하지않습니다.';
          }
        },
        ...validate,
      },
      ...rest,
    }),
    type: 'email',
    label: texts?.label ?? '이메일',
    placeholder: texts?.placeholder ?? '이메일을 입력해주세요.',
    error: getMessageFromFieldErrors(methods.formState.errors, name),
    ...props
  };
}

export const EMAIL_ERROR_TEXTS = {
  alreadyExist: '이미 존재하는 이메일입니다.',
  withdrawal: '탈퇴한 회원입니다.',
};
