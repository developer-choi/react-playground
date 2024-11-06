'use client';

import React from 'react';
import InputFile from '@/components/form/InputFile';
import ProfileImage from '@/components/element/ProfileImage';
import {useSingleFileImagePreview} from '@/utils/extend/file/file-converter';
import {fileSizeToByte} from '@/utils/extend/file/file-size';

// URL: http://localhost:3000/staging/form/image-file/with-profile
// Doc: 따로 없음.

/** 프로필 이미지 요구사항
 * 1. 이미지 동그랗게 노출해야하고,
 * 2. 사이즈별 크기조정도 지원해야.
 * 3. 비율 달라도 object-fit cover를 통해 찌그러지지않게 조정해야.
 *
 * 4. (다른 컴포넌트와 같이 쓰는 케이스) 프로필이미지 수정용으로도 지원해야.
 */
export default function Page() {
  const {preview, inputFileProps} = useSingleFileImagePreview({
    // initialImageUrl: '/imgs/profile.png',
    validateOption: {
      limitSize: fileSizeToByte(20, 'MB'),
    }
  });

  return (
    <>
      <div>
        <ProfileImage size="small" src="/imgs/profile.png"/>
        <ProfileImage size="medium" src="/imgs/profile.png"/>
        <ProfileImage size="large" src="/imgs/profile.png"/>

        <InputFile {...inputFileProps}>
          <ProfileImage size="large" src={preview?.src}/>
        </InputFile>
      </div>
    </>
  );
}
