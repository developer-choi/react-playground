import {FieldPath, FieldValues} from 'react-hook-form';
import {PasswordInputProps} from '@/components/form/Input/PasswordInput';
import {FormInputParam} from '@/utils/service/common/inputs';
import {getMessageFromFieldErrors} from '@/utils/extend/library/react-hook-form';

/**
 * Doc : https://docs.google.com/document/d/1YpwgJ2PoG2MfD6S9NDppZUGUgG_71UxbsGNXARkFGiE/edit?pli=1#heading=h.928v2tsf8s16
 *
 * 대부분의 페이지에서는 사이트마다 비밀번호정책에 맞는 다양한 유효성검증을 거치고있지만,
 * 1. 로그인페이지
 * 2. 마이페이지 회원 재확인 (내정보수정 들어가기 직전)
 * 3. 회원용 비번변경 > 기존비번
 * 에서는 과거 정책이 어땠는지에 따라 알 수 없는 부분이 있어서 이런경우 필수여부만 체크하는경우가 있음.
 *
 * 만약 랭디처럼 로그인 페이지 비번이 pure하지 않은경우, (정책 변경없었어서 로그인페이지도 비번체크 다 하는 경우)
 * getSinglePasswordInputProps() 정도로 이름을 바꿔서 기존 pure 함수를 대체하게 하고,
 * getPasswordInputPropsWithConfirm() 안에있는 실제 비번 유효성검증 규칙을 (최소길이, 특수문자 등)
 * 그 getSingle...()에 작성하는 방식으로 대체하면 됨.
 */
export function getPurePasswordInputProps<T extends FieldValues>(param: FormInputParam<T>): PasswordInputProps {
  const {texts, form: {name, methods, options, props}} = param;

  return {
    ...methods.register(name, {
      required: texts?.required ?? '비밀번호는 필수입니다.',
      ...options
    }),
    label: texts?.label ?? '비밀번호',
    placeholder: texts?.placeholder ?? '비밀번호를 입력해주세요.',
    error: getMessageFromFieldErrors(methods.formState.errors, name),
    ...props
  };
}

export interface PasswordWithConfirmInputParam<T extends FieldValues> extends FormInputParam<T> {
  confirmName: FieldPath<T>;
}

/**
 * 하단에 확인용 비밀번호가 붙어있는 케이스의 "기본" 비밀번호 함수.
 *
 * 주의사항)
 * 1. 확인용 비밀번호는 하단 getConfirmPasswordInputProps()를 사용
 * 2. 비밀번호 인풋 하나만 단독으로 있는 경우에는 getPurePasswordInputProps()를 사용. (ex: 로그인 페이지)
 */
export function getPasswordInputPropsWithConfirm<T extends FieldValues>(param: PasswordWithConfirmInputParam<T>): PasswordInputProps {
  const {confirmName, form, texts} = param;
  const {setError, clearErrors} = form.methods;
  const {validate, ...restOptions} = form.options ?? {};

  return getPurePasswordInputProps({
    texts,
    form: {
      name: form.name,
      methods: form.methods,
      props: form.props,
      options: {
        /**
         * (1) required 규칙, 에러메시지, label~placeholder 텍스트는 위 pure 함수에서 설정되어있음.
         * (2) 사이트의 비밀번호 기획에 해당하는 코드가 들어가면됨. (최소~최대 길이, 허용되는 특수문자 2개는 꼭 들어가는 편인듯)
         * -- 일단 어떠한 경우에도 공백은 반드시 막아야함. 보통은 (2)에서 regex로 넣다가 공백이 같이 막히는 케이스가많고,
         * -- 랭디처럼 regex 없이 자릿수만 따지는 경우가 있다면 공백을 별도로 막아야함.
         *
         * + regex 주의사항으로, g 플래그가 절대 들어가면 안됨. 같은 제출을 두번했을 때 처음엔 에러로 걸리고 두 번째는 안걸리는 이상한버그를 TBH 때 많이 겪음.
         */
        validate: {
          notEqual: (value, formValues) => {
            const confirmValue = formValues[confirmName];

            //[비밀번호] 입력하고, [비밀번호 확인] 입력한 후 [비밀번호]를 다시 수정했을 때 예외처리 추가
            if (confirmValue && value !== confirmValue) {
              setError(confirmName, {
                type: 'notEqual',
                message: TEXT.error.notEqual,
              });
            } else {
              clearErrors(confirmName);
            }

            return true;
          },
          ...validate,
        },
        ...restOptions,
      },
    }
  });
}

export interface ConfirmPasswordInputParam<T extends FieldValues> extends FormInputParam<T> {
  passwordName: FieldPath<T>;
}

// 확인용 비밀번호 인풋에서 사용
export function getConfirmPasswordInput<T extends FieldValues>(param: ConfirmPasswordInputParam<T>): PasswordInputProps {
  const {texts, form, passwordName} = param;
  const {validate, ...restOptions} = form.options ?? {};

  return getPurePasswordInputProps({
    texts: {
      required: texts?.required ?? '비밀번호를 다시 입력해주세요.',
      label: '비밀번호 확인',
      placeholder: '비밀번호를 다시 입력해주세요.',
    },
    form: {
      name: form.name,
      methods: form.methods,
      props: form.props,
      options: {
        validate: {
          notEqual: (value, formValues) => {
            const passwordValue = formValues[passwordName];

            if (!value || passwordValue === value) {
              return true;
            } else {
              return TEXT.error.notEqual;
            }
          },
          ...validate,
        },
        ...restOptions,
      }
    },
  });
}

export const PASSWORD_ERROR_TEXTS = {
  notFound: '아이디 또는 비밀번호를 다시 확인해주세요.',
  invalidOrigin: '기존 비밀번호가 일치하지 않습니다.'
};

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const TEXT = {
  error: {
    notEqual: '비밀번호가 일치하지 않습니다.'
  }
};