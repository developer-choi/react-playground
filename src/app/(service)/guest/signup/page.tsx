'use client';

import designSystemStyles from '@/styles/design-system.module.scss';
import Input from '@/components/form/Input';
import React from 'react';
import {Button} from '@forworkchoe/core';
import useGeneralSignUpForm from '@/utils/service/guest/useGeneralSignUpForm';
import PasswordInput from '@/components/form/Input/PasswordInput';

// URL: http://localhost:3000/guest/signup
export default function Page() {
  const {form, inputProps} = useGeneralSignUpForm();

  return (
    <form className={designSystemStyles.commonForm} onSubmit={form.onSubmit}>
      <Input {...inputProps.email}/>
      <PasswordInput {...inputProps.password}/>
      <PasswordInput {...inputProps.passwordConfirm}/>
      <Button loading={form.loading} isSubmit>회원가입</Button>
    </form>
  );
}
