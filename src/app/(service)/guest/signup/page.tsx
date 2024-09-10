'use client';

import designSystemStyles from '@/styles/design-system.module.scss';
import Input from '@/components/form/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {useCallback} from 'react';
import Button from '@/components/element/Button';
import {useRouter} from 'next/navigation';
import {useMutation} from '@tanstack/react-query';
import {postTemporaryDataApi} from '@/utils/service/api/temporary';

// URL: http://localhost:3000/guest/signup
export default function Page() {
  const {register, handleSubmit} = useForm<SignUpFormData>();
  const {replace} = useRouter();

  const {mutateAsync} = useMutation({
    mutationFn: postTemporaryDataApi
  });

  const onSubmit: SubmitHandler<SignUpFormData> = useCallback(async data => {
    await mutateAsync({
      name: 'signUpSuccess',
      data
    });
    replace('/guest/signup/success');
  }, [mutateAsync, replace]);

  return (
    <form className={designSystemStyles.commonForm} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="이름을 입력하세요" {...register('name', {required: '이름은 필수입니다.'})}/>
      <Button type="submit" size="large">회원가입</Button>
    </form>
  );
}

interface SignUpFormData {
  name: string;
}