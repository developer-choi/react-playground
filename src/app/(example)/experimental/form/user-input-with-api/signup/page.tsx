'use client';

import {useCallback} from 'react';
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {useUserFieldApiValidation} from '@/utils/service/common/inputs/api-validation';
import Input, {InputProps} from '@/components/form/Input';
import {EMAIL_ERROR_TEXTS, getEmailInputProps} from '@/utils/service/common/inputs/user/email';
import {Button} from '@forworkchoe/core';
import HiddenInput from '@/components/form/Input/HiddenInput';

/**
 * URL: http://localhost:3000/experimental/form/user-input-with-api/signup
 * Doc: [Handle member input] https://docs.google.com/document/d/1O0UMNf505xpytsAAUlKFr29rMmj5XvdP8Gr1uP9l4-s/edit#heading=h.dbl5hy7qrxlu
 * Doc: [HiddenInput] https://docs.google.com/document/d/11GkQkim2_x9jiADwnyzNhzTPBQfx6qiTsi1AVmhZ3P0/edit
 *
 * [중복 체크되는 이메일 목록]
 * random@random.com
 * test3@random.com
 * test5@random.com
 */
export default function Page() {
  const {inputProps, validatedProps, form} = useSignUpForm();

  return (
    <form onSubmit={form.onSubmit}>
      <Input {...inputProps.email}/>
      <HiddenInput {...validatedProps.email}/>
      <Button type="submit" loading={form.isFetching}>Submit</Button>
    </form>
  );
}

/**
 * 회원정보 (이메일, 닉네임 등) 인풋 구현할 때는, 2개의 함수를 기억하면됨.
 * 1. 항상 > use[Some]Input() 사용
 * 2. onChange 시점에 API를 통해 유효성검증이 필요하면, 추가로 useUserFieldApiValidation() 사용.
 *
 * 그래서 email / nickname / birthday 총 3개를 입력해야한다면,
 * use[Some]Input()는 3번 호출되고
 * useUserFieldApiValidation()는 2번 호출되는 양상이 될거임.
 */
function useSignUpForm() {
  /**
   * 원래 내 이름값,
   * 내정보수정 에서는 꼭 전달해야하고
   * 회원가입에서는 없어야함.
   */
  const initial = {
    email: 'hong@gildong.com'
    // email: undefined
  };

  const methods = useForm<TestFormData>({
    defaultValues: {
      email: initial.email ?? ''
    },

    /** TODO
     * onChange 시점에 API로 유효성검증 하는경우 mode를 기본값으로 쓰면, 값이 유효하지않은데 API 호출되버림
     * 하지만 단점은, 아직 이메일 다 입력도 안했는데 에러메시지가 노출된다는것.
     * 이부분은 추후 개선하기로...
     */
    mode: 'onChange'
  });

  const {handleSubmit} = methods;

  // 회원가입에서는 그대로 쓰고 (required true) / 수정에서는 required false로 옵션만 커스텀하면됨.
  const emailInputProps: InputProps = {
    ...getEmailInputProps({
      form: {
        methods,
        name: 'email',
      }
    }),
    autoFocus: true
  };

  const {isFetching, hiddenInputProps} = useUserFieldApiValidation({
    form: {
      methods,
      fieldName: 'email',
      validationFieldName: 'validated.email',
      initialValue: initial.email // 회원가입에서는 undefined, 내정보수정에서는 문자열값
    },
    apiConfig: {
      type: 'email',
      validationMode: 'does-not-exist', // 회원가입에서는 없는게 정상, 아이디찾기는 있는게 정상
      onlyActiveUser: false // 회원가입에서는 false, 아이디찾기에서는 true
    }
  });

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    console.error('errors', errors)
  }, []);

  // 클라이언트 컨트롤용 데이터는 서버로 보내지않게 하기위함
  const onSubmit: SubmitHandler<TestFormData> = useCallback(async ({validated: _validated, ...data}) => {
    if (isFetching) {
      return;
    }
    
    try {
      await signupApi(data);
    } catch (error) {
      if (error === '이미 이메일이 존재한다는 에러') {
        methods.setError('email', {
          type: 'api',
          message: EMAIL_ERROR_TEXTS.alreadyExist
        }, {
          shouldFocus: true
        });
      }
    }
  }, [isFetching, methods]);

  return {
    form: {
      onSubmit: handleSubmit(onSubmit, onError),
      isFetching
    },
    inputProps: {
      email: emailInputProps
    },
    validatedProps: {
      email: hiddenInputProps
    }
  };
}

interface TestFormData {
  email: string;
  validated: {
    email: string;
  };
}

async function signupApi(data: any) {
  console.log('request api', data);
}