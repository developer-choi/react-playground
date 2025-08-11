import {EMAIL_ERROR_TEXTS, getEmailInputProps} from '@/utils/service/common/inputs/user/email';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useCallback} from 'react';
import {getConfirmPasswordInput, getPasswordInputPropsWithConfirm} from '@/utils/service/common/inputs/user/password';
import {useHandleClientSideError} from '@/utils/service/common/error/client';
import {useMutation} from '@tanstack/react-query';
import {postSignUpApi} from '@/utils/service/common/api/auth';
import {postTemporaryDataApi} from '@/utils/service/common/api/temporary-client';
import {useRouter} from 'next/navigation';
import {FetchError} from '@/utils/service/common/error/class/fetch';

/**
 * TODO
 * Certification Form 추가필요
 */
export default function useGeneralSignUpForm() {
  const {replace} = useRouter();
  const handleClientSideError = useHandleClientSideError();
  const methods = useForm<SignUpFormData>();
  const {handleSubmit, setError} = methods;

  const emailInputProps = getEmailInputProps({
    form: {
      methods,
      name: 'email',
      props: {
        autoFocus: true
      }
    }
  });

  const passwordInputProps = getPasswordInputPropsWithConfirm({
    form: {
      methods,
      name: 'password',
    },
    confirmName: 'passwordConfirm',
  });

  const passwordConfirmInputProps = getConfirmPasswordInput({
    form: {
      methods,
      name: 'passwordConfirm',
    },
    passwordName: 'password'
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
    } catch (error) {
      if (!(error instanceof FetchError && error.apiErrorInfo)) {
        handleClientSideError(error);
        return;
      }

      switch (error.apiErrorInfo.params.code) {
        case 'ALREADY_EMAIL_EXISTED':
          setError('email', {
            type: 'api',
            message: EMAIL_ERROR_TEXTS.alreadyExist
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