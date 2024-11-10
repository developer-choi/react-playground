'use client';

import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {ChangeEvent, useCallback} from 'react';
import {baseHandleErrors} from '@/utils/extend/library/react-hook-form';
import Button from '@/components/element/Button';

/** 재현방법 > 파일 하나 넣고 제출해보기
 * 한계 1. event.target.value = '' 하면, setValue 하더라도 required options에 걸린다.
 * - https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file#answer-60886920 이거 때문에 event.target.value = ''는 필수인데.
 * - 근데 또 watch()로 값을 찍어보면 찍히긴 함...
 */
export default function Home() {
  const {register, handleSubmit, setValue, watch} = useForm<FileFormData>();

  const onError: SubmitErrorHandler<FileFormData> = useCallback(({file}) => {
    baseHandleErrors([file]);
  }, []);

  const onSubmit: SubmitHandler<FileFormData> = useCallback(async (data) => {
    console.log('data', data.file);
  }, []);

  const fileProps = register('file', {
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setValue('file', event.target.files?.item(0) ?? undefined);
      event.target.value = '';
    },
    required: '필수입니다.'
  });

  console.log('file name=', watch('file')?.name);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input type="file" {...fileProps}/>
      <Button type="submit">Submit</Button>
    </form>
  );
}

interface FileFormData {
  file: File | undefined;
}
