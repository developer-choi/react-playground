import {EMAIL_TEXT, getEmailInputProps} from '@/utils/service/user/fields/email';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useCallback} from 'react';
import {getConfirmPasswordInput, getPasswordInputPropsWithConfirm} from '@/utils/service/user/fields/password';
import {useHandleClientSideError} from '@/utils/service/error/client-side';
import {SignUpApiResponse} from '@/types/services/auth';
import {useMutation} from '@tanstack/react-query';
import {postSignUpApi} from '@/utils/service/api/auth';
import {InputProps} from '@/components/form/Input';
import {postTemporaryDataApi} from '@/utils/service/api/temporary';
import {useRouter} from 'next/navigation';

/**
 * TODO
 * Certification Form 추가필요
 */
export default function useGeneralSignUpForm() {
  const {replace} = useRouter();
  const handleClientSideError = useHandleClientSideError();
  const methods = useForm<SignUpFormData>();
  const {register, handleSubmit, formState: {errors}, setError, watch} = methods;

  const emailInputProps: InputProps = {
    ...getEmailInputProps({
      name: 'email',
      errors,
      register
    }),
    autoFocus: true
  };

  const passwordInputProps = getPasswordInputPropsWithConfirm({
    methods,
    name: 'password',
    confirmFormName: 'passwordConfirm',
  });

  const passwordConfirmInputProps = getConfirmPasswordInput({
    register,
    errors,
    name: 'passwordConfirm',
    passwordValue: watch('password')
  });

  const {isPending, mutateAsync, isSuccess} = useMutation({
    mutationFn: postSignUpApi
  });
  
  const onSubmit: SubmitHandler<SignUpFormData> = useCallback(async data => {
    // API 호출중 or 성공 후 다음 페이지 이동 전까지 폼제출 안되게
    if(isPending || isSuccess) {
      return;
    }

    try {
      await mutateAsync({
        email: data.email,
        password: data.password
      });
      await postTemporaryDataApi({
        name: 'signUpSuccess',
        data
      });
      replace('/guest/signup/success');
    } catch (error: any) {
      if (!('json' in error)) {
        handleClientSideError(error);
        return;
      }

      const {code} = error.json as SignUpApiResponse;

      switch (code) {
        case 'ALREADY_EMAIL_EXISTED':
          setError('email', {
            type: 'api',
            message: EMAIL_TEXT.alreadyExist
          }, {shouldFocus: true});
          return;
        default:
          handleClientSideError(error);
      }
    }
  }, [handleClientSideError, isPending, isSuccess, mutateAsync, replace, setError]);

  return {
    form: {
      onSubmit: handleSubmit(onSubmit),
      loading: isPending || isSuccess,
    },
    inputProps: {
      email: emailInputProps,
      password: passwordInputProps,
      passwordConfirm: passwordConfirmInputProps
    }
  };
}

interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirm: string;
}