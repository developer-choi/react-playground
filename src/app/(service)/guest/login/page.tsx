'use client';

import React from 'react';
import Link from 'next/link';
import designSystemStyles from '@/styles/design-system.module.scss';
import Input from '@/components/form/Input';
import Button from '@/components/element/Button';
import useGeneralLoginForm from '@/utils/service/user/login/useGeneralLoginForm';
import PasswordInput from '@/components/form/Input/PasswordInput';

export default function Login() {
  const {form, inputProps} = useGeneralLoginForm();

  return (
    <form className={designSystemStyles.commonForm} onSubmit={form.onSubmit}>
      <Input {...inputProps.email}/>
      <PasswordInput {...inputProps.password}/>
      <Button type="submit" loading={form.loading}>Login</Button>
      <Link href="/mypage" style={{textDecoration: 'underline'}}>Mypage로 바로가는 링크</Link>
    </form>
  );
}
