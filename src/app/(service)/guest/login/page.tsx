'use client';

import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import React, {useCallback, useEffect} from 'react';
import {signIn} from "next-auth/react";
import {getRedirectUrlWhenLoginSuccess} from '@/utils/service/auth/redirect';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import designSystemStyles from '@/styles/design-system.module.scss';
import Input from '@/components/form/Input';
import Button from '@/components/element/Button';

export default function Login() {
  const {register, handleSubmit} = useForm<LoginFormData>({
    defaultValues: {
      email: 'email@domain.com',
      password: '12345678'
    }
  });

  const onError: SubmitErrorHandler<LoginFormData> = useCallback(errors => {
    alert(JSON.stringify(errors));
  }, []);

  const onSubmit: SubmitHandler<LoginFormData> = useCallback(async data => {
    try {
      const result = await backendLoginApi(data.email, data.password);

      await signIn("credentials", {
        callbackUrl: getRedirectUrlWhenLoginSuccess(),
        ...result
      }, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

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

  return (
    <form className={designSystemStyles.commonForm} onSubmit={handleSubmit(onSubmit, onError)}>
      <Input {...register('email')}/>
      <Input type="password" {...register('password')}/>
      <Button type="submit">Login</Button>
      <Link href="/mypage" style={{textDecoration: 'underline'}}>Mypage로 바로가는 링크</Link>
    </form>
  );
}

async function backendLoginApi(email: string, _: string) {
  return {
    member_id: 1,
    email,
    name: 'somename',
    access_token: '[access_token_value]'
  };
}

interface LoginFormData {
  email: string;
  password: string;
}
