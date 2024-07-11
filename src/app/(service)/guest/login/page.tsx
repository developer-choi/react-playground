'use client';

import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {useCallback} from "react";
import styles from "./page.module.scss";
import {signIn} from "next-auth/react";
import {getRedirectUrlWhenLoginSuccess} from '@/utils/service/auth/redirect';

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

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register('email')}/>
      <input type="password" {...register('password')}/>
      <button autoFocus>Login</button>
    </form>
  )
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
