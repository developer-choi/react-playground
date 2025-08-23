'use client';

import React from 'react';
import Link from 'next/link';
import designSystemStyles from '@/styles/design-system.module.scss';
import Input from '@/components/form/Input';
import {Button} from '@forworkchoe/core';
import useGeneralLoginForm from '@/utils/service/guest/useGeneralLoginForm';
import PasswordInput from '@/components/form/Input/PasswordInput';

/**
 * URL: http://localhost:3000/guest/login
 * Doc: [Login Page] https://docs.google.com/document/d/17dAqVKzc_YhPHDfl7b9HrotkKP_QpNN8igo7WQFi77M/edit#heading=h.607q5b5cmo2u
 */
export default function Login() {
  const {form, inputProps} = useGeneralLoginForm();

  return (
    <form className={designSystemStyles.commonForm} onSubmit={form.onSubmit}>
      <Input {...inputProps.email}/>
      <PasswordInput {...inputProps.password}/>
      <Button loading={form.loading} isSubmit>Login</Button>
      <Link href="/mypage" style={{textDecoration: 'underline'}}>Mypage로 바로가는 링크</Link>
    </form>
  );
}
