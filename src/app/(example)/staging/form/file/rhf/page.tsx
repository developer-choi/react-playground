'use client';

import React, {useCallback, useEffect} from 'react';
import {FormElementUnderText} from '@/components/form/form-elements';
import HiddenInput from '@/components/form/Input/HiddenInput';
import InputFile from '@/components/form/Input/inputFile';
import {SubmitHandler, useForm} from 'react-hook-form';
import Button from '@/components/element/Button';

// URL: http://localhost:3000/staging/form/file/rhf
// Doc: https://docs.google.com/document/d/1vlpxoOK6XzDqWgvEqGvHb_Ie6yGcq9BH5-m_XBF3FQk/edit?tab=t.0
export default function Page() {
  const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm<FileFormData>();

  const onSubmit: SubmitHandler<FileFormData> = useCallback(async (data) => {
    console.log('submit', data);
  }, []);

  const onChangeFiles = useCallback((files: File[]) => {
    console.log('change files', files);
    setValue('files', files);
    // setValue할 때 HiddenInput꺼도 같이 set 해야함.
    setValue('valid', true, {
      shouldValidate: true
    });
  }, [setValue]);

  console.log('form state', errors, watch('files'));

  useEffect(() => {
    // register('files', {required: '필수임 ㅅㄱ'});
    register('files'); // 옵션에 전달할 에러메시지는 hidden input으로 전달한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputFile onChangeFiles={onChangeFiles}>
        <Button size="small" variant="outlined">파일 등록</Button>
        <HiddenInput {...register('valid', {required: '필수입니다.'})}/>
      </InputFile>
      {/* 에러메시지는 반드시 HiddenInput으로 연결해야함. */}
      <FormElementUnderText type="error">{errors.valid?.message}</FormElementUnderText>
      <div style={{height: 2000, backgroundColor: 'lightcoral'}}/>
      <Button isSubmit>제출</Button>
    </form>
  );
}

interface FileFormData {
  files: File[];
  valid: boolean;
}
