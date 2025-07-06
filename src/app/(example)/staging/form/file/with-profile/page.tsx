'use client';

import React, {useCallback} from 'react';
import InputFile from '@/components/form/Input/inputFile';
import ProfileImage from '@/components/element/ProfileImage';
import {useRHFSingleImageFile} from '@/utils/extend/file/handle-image/react-hook-form';
import {fileSizeToByte} from '@/utils/extend/file/file-size';
import Button from '@/components/element/Button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormElementUnderText} from '@/components/form/form-elements';
import Link from 'next/link';
import {useSingleImageFile} from '@/utils/extend/file/handle-image/state';
import {SingleFileAndThumbnail} from '@/utils/extend/file/handle-image/core';
import {getMessageFromFieldErrors} from '@/utils/extend/library/react-hook-form';

// URL: http://localhost:3000/staging/form/file/with-profile
// Doc: 따로 없음.

/** 프로필 이미지 요구사항
 * 1. 이미지 동그랗게 노출해야하고,
 * 2. 사이즈별 크기조정도 지원해야.
 * 3. 비율 달라도 object-fit cover를 통해 찌그러지지않게 조정해야.
 *
 * 4. (다른 컴포넌트와 같이 쓰는 케이스) 프로필이미지 수정용으로도 지원해야.
 */
export default function Page() {
  return (
    <>
      <StateBased/>
      <RHFBased/>
      <Link href="/">Unmount 테스트용 다른 페이지 가는 링크</Link>
    </>
  );
}

function StateBased() {
  const {image, inputFileProps, file} = useSingleImageFile({
    // initialImageUrl: '/imgs/profile.png',
    options: {
      limitSize: fileSizeToByte(20, 'MB'),
    }
  });

  const onSubmit = useCallback(() => {
    console.log('file', file);
  }, [file]);

  return (
    <div>
      <InputFile {...inputFileProps}>
        <ProfileImage size="large" src={image?.src}/>
      </InputFile>
      <Button onClick={onSubmit}>제출</Button>
    </div>
  );
}

function RHFBased() {
  const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm<FileFormData>({
    defaultValues: {
      // profile: getInitialSingleImagePreview('/imgs/profile.png')
    }
  });

  const onSubmit: SubmitHandler<FileFormData> = useCallback((data) => {
    console.log('submit', data);
  }, []);

  const {item, clearItem, inputProps} = useRHFSingleImageFile({
    methods: {
      register,
      setValue,
      watch
    },
    options: {
      limitSize: fileSizeToByte(20, 'MB'),
    },
    names: {
      item: 'profile',
      validator: 'profileIsValid'
    },
    // isValidOptions: '필수입니다.'
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputFile {...inputProps.file}>
        <ProfileImage size="large" src={item.image?.src}/>
      </InputFile>
      <FormElementUnderText type="error">{getMessageFromFieldErrors(errors, 'profileIsValid')}</FormElementUnderText>
      <div>
        <Button type="submit">제출</Button>
        <Button variant="outlined" onClick={clearItem}>초기화</Button>
      </div>
    </form>
  );
}

interface FileFormData {
  profile: SingleFileAndThumbnail;
  profileIsValid: boolean;
}
