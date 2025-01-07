import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {useCallback, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {InputProps} from '@/components/form/Input';
import {getEmailInputProps} from '@/utils/service/user/fields/email';
import {getPurePasswordInputProps, PASSWORD_TEXT} from '@/utils/service/user/fields/password';
import {useMutation} from '@tanstack/react-query';
import {useHandleClientSideError} from '@/utils/service/error/client-side';
import {postLoginApi} from '@/utils/service/api/auth';
import {LoginApiFailResponse} from '@/types/services/auth';
import {useLogin} from '@/utils/service/auth/hooks';

// SNS 로그인이 아닌 일반 로그인에 해당
export default function useGeneralLoginForm() {
  const handleClientSideError = useHandleClientSideError();
  const {register, handleSubmit, formState: {errors}, setError} = useForm<LoginFormData>({
    defaultValues: {
      email: 'email@domain.com',
      password: ''
    }
  });

  const {mutateAsync, isPending, isSuccess} = useMutation({
    mutationFn: postLoginApi
  });

  const onError: SubmitErrorHandler<LoginFormData> = useCallback(errors => {
    console.error(errors);
  }, []);

  const login = useLogin();
  const onSubmit: SubmitHandler<LoginFormData> = useCallback(async data => {
    // API 호출중 or 성공 후 다음 페이지 이동 전까지 폼제출 안되게
    if(isPending || isSuccess) {
      return;
    }

    try {
      const result = await mutateAsync(data);
      login(result);
    } catch (error: any) {
      if (!('json' in error)) {
        handleClientSideError(error);
        return;
      }

      const {code} = error.json as LoginApiFailResponse;

      switch (code) {
        case 'NOT_FOUND':
          setError('email', {
            type: 'api',
            message: PASSWORD_TEXT.notFound
          });
          setError('password', {
            type: 'api',
            message: PASSWORD_TEXT.notFound
          });
          return;
        default:
          handleClientSideError(error);
      }
    }
  }, [handleClientSideError, isPending, isSuccess, login, mutateAsync, setError]);

  const emailInputProps: InputProps = {
    ...getEmailInputProps({name: 'email', errors, register}),
    autoFocus: true,
  };

  const passwordInputProps: InputProps = getPurePasswordInputProps({name: 'password', errors, register});

  const {refresh} = useRouter();

  /**
   * https://www.reddit.com/r/nextjs/comments/1aeo8u9/disable_route_caching/
   * [Route Cache] https://docs.google.com/document/d/1Hm4lfXT9eelHDzxz7f-5xWcVIpfyPSVZmCSHay_sDcM/edit#heading=h.x78fgzs1zs5r
   * [Next Auth Solution] https://docs.google.com/document/d/1IJD_63-SDXgiODMoe0fX0RtQhKk6lz27guTKaH65jbw/edit
   *
   * 1. 기존에 로그인된 상태로 Mypage 페이지에 한번 갔었다가,
   * 2. 30초 이내로 아래 동작을 하면 문제가 됩니다.
   * (1) 로그아웃 버튼을 통해 로그인 페이지로 온 다음
   * (2) (로그인 안한상태로) Mypage링크 누르면
   * (3) 좀전에 봤던 Mypage 페이지가 노출됩니다.
   * (중간에 middleware 또는 Server Side API 호출같은거 일절없이)
   */
  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    form: {
      onSubmit: handleSubmit(onSubmit, onError),
      loading: isPending || isSuccess
    },
    inputProps: {
      email: emailInputProps,
      password: passwordInputProps
    }
  };
}

interface LoginFormData {
  email: string;
  password: string;
}
