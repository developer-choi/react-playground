'use client';

import {fileSizeToByte} from '@/utils/extend/file/file-size';
import React, {useCallback} from 'react';
import DragAndDrop from '@/components/form/DragAndDrop';
import styles from './page.module.scss';
import Image from 'next/image';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormElementUnderText} from '@/components/form/form-elements';
import Button from '@/components/element/Button';
import HiddenInput from '@/components/form/Input/HiddenInput';
import {useRHFMultipleImageFile} from '@/utils/extend/file/handle-image/react-hook-form';
import {FileAndThumbnail} from '@/utils/extend/file/handle-image/core';

// URL: http://localhost:3000/staging/form/file/drag-and-drop
// Doc: https://docs.google.com/document/d/1_9-Bw4SihS6DGpskF8Xor_gaahHetDfKDk6QJeZQ6Ig/edit?tab=t.0
export default function DragAndDropPage() {
  const {handleSubmit, watch, setValue, register, formState: {errors}} = useForm<FileFormData>({
    defaultValues: {
      files: []
    }
  });

  const onSubmit: SubmitHandler<FileFormData> = useCallback(async (data) => {
    console.log('submit', data);
  }, []);

  const {inputProps, list} = useRHFMultipleImageFile({
    methods: {
      setValue,
      watch,
      register
    },
    isValidOptions: '파일 등록은 필수입니다.',
    names: {
      list: 'files',
      validator: 'valid'
    },
    options: {
      extensions,
      limitSize: fileSizeToByte(20, 'MB'),
      maxCount: 10,
      enableDuplicated: true
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.page}>
        <label style={{cursor: 'pointer'}}>
          <DragAndDrop className={styles.dropBox} enableFileExplorer {...inputProps.file}>
            <HiddenInput {...inputProps.isValid}/>
            <div className={styles.message}>Drop Here</div>
          </DragAndDrop>
        </label>
      </div>
      {list.map((extendedFile) => (
        <Image key={extendedFile.image.src} src={extendedFile.image.src} width={100} height={100} alt="user select image"/>
      ))}
      {!errors.valid?.message ? null : (
        <FormElementUnderText type="error">{errors.valid.message}</FormElementUnderText>
      )}
      <Button type="submit" size="large">제출</Button>
    </form>
  );
}

const extensions = ['.jpg', '.png', '.jfif'];

interface FileFormData {
  files: FileAndThumbnail[] | undefined;
  valid: boolean;
}
