import {FieldPath, FieldValues, UseFormReturn} from 'react-hook-form';
import {UserInputParam} from '@/utils/service/user/fields/email';
import {PasswordInputProps} from '@/components/form/Input/PasswordInput';

/**
 * Doc : https://docs.google.com/document/d/1YpwgJ2PoG2MfD6S9NDppZUGUgG_71UxbsGNXARkFGiE/edit?pli=1#heading=h.928v2tsf8s16
 * 유효성검증을 하지않는 비밀번호 <input>의 react-hook-form options를 반환.
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
export function getPurePasswordInputProps<T extends FieldValues>({name, options, errors, register}: UserInputParam<T>): PasswordInputProps {
  return {
    ...register(name, {
      required: TEXT.error.required,
      ...options
    }),
    label: TEXT.label,
    placeholder: TEXT.placeholder,
    error: errors[name]?.message as string | undefined
  };
}

export interface PasswordWithConfirmInputParam<T extends FieldValues> extends Pick<UserInputParam<T>, 'name' | 'options'> {
  confirmFormName: FieldPath<T>;
  methods: UseFormReturn<T>;
}

/**
 * 하단에 확인용 비밀번호가 붙어있는 케이스의 "기본" 비밀번호 함수.
 *
 * 주의사항)
 * 1. 확인용 비밀번호는 하단 getConfirmPasswordInputProps()를 사용
 * 2. 비밀번호 인풋 하나만 단독으로 있는 경우에는 getPurePasswordInputProps()를 사용. (ex: 로그인 페이지)
 */
export function getPasswordInputPropsWithConfirm<T extends FieldValues>({confirmFormName, options = {}, methods, name}: PasswordWithConfirmInputParam<T>): PasswordInputProps {
  /**
   * 실무에서는 옵션 커스텀 할 수 있도록 하는 이 번거로운 구현을 삭제하는게 좋아보임.
   * 확장할 일이 생기지도 않았는데 확장할 수 있는 옵션 제공을 하는건 내 코딩 스타일이 아님.
   */
  const { validate, ...restOptions } = options;
  const {setError, getValues, clearErrors, register, formState: {errors}} = methods;

  const passwordInputProps = getPurePasswordInputProps({
    name,
    errors,
    register,
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
    label: '새 비번',
    placeholder: '새 비번 힌트텍스트',
  };
}

export interface ConfirmPasswordInputParam<T extends FieldValues> extends UserInputParam<T> {
  passwordValue: string | undefined;
}

// 확인용 비밀번호 인풋에서 사용
export function getConfirmPasswordInput<T extends FieldValues>({options = {}, passwordValue, ...rest}: ConfirmPasswordInputParam<T>): PasswordInputProps {
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
    label: '새 비번 확인',
    placeholder: '새 비번확인 힌트텍스트',
  }
}

// 필기는 같은폴더 email.ts 주석 참고
export const PASSWORD_TEXT = {
  notFound: '아이디 또는 비밀번호를 다시 확인해주세요.',
  invalidOrigin: '기존 비밀번호가 일치하지 않습니다.'
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