'use client';

import React, {useCallback, useEffect} from 'react';
import {FormElementUnderText} from '@/components/form/form-elements';
import HiddenInput from '@/components/form/Input/HiddenInput';
import InputFile from '@/components/form/Input/inputFile';
import {SubmitHandler, useForm} from 'react-hook-form';
import Button from '@/components/element/Button';
import {getMessageFromFieldErrors} from '@/utils/service/common/inputs';

/**
 * URL: http://localhost:3000/staging/form/file/rhf
 * Doc: https://docs.google.com/document/d/1vlpxoOK6XzDqWgvEqGvHb_Ie6yGcq9BH5-m_XBF3FQk/edit?tab=t.0
 *
 * 이 예제는, [Limitations of RHF and File] https://docs.google.com/document/d/1-LnoMFl3sXkgyIxVaiJ5Guh5iJQHbqrMBjrmw4EPSBM/edit?tab=t.0
 * 이 문서에 적힌 RHF의 한계를 극복하기 위한 RHF의 기본 예제 페이지고,
 *
 * 이 한계를 극복시켜서 만든 내 모듈들을 테스트 하는 페이지는, 같은 폴더 내
 * 1. drag-and-drop (여러개 케이스)
 * 2. with-profile 페이지 (1개 케이스)
 * 참고 하면됨.
 */
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
      <FormElementUnderText type="error">{getMessageFromFieldErrors(errors, 'valid')}</FormElementUnderText>
      <div style={{height: 2000, backgroundColor: 'lightcoral'}}/>
      <Button isSubmit>제출</Button>
    </form>
  );
}

interface FileFormData {
  files: File[];
  valid: boolean;
}
