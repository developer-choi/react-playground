'use client';

import React from 'react';
import {fileSizeToByte} from '@/utils/extend/file/file-size';
import Image from 'next/image';
import {useSingleFileImagePreview} from '@/utils/extend/file/file-converter';
import InputFile from '@/components/form/InputFile';

/** Scenario 1
 * 파일 하나 등록 하고나서
 * 새로 또 하나 등록하면
 * 기존 파일 삭제되면서
 * 새 파일이 등록되면 OK
 */

/** Scenario 2
 * 파일 하나 등록 하고나서
 * 미리보기에서 삭제한 후
 * 또 하나 등록하면 OK
 */

// URL: http://localhost:3000/staging/form/image-file/single
// Doc: https://docs.google.com/document/d/1_9-Bw4SihS6DGpskF8Xor_gaahHetDfKDk6QJeZQ6Ig/edit?tab=t.0
export default function Page() {
  const {preview, inputFileProps, removeItem} = useSingleFileImagePreview({
    initialImageUrl: 'https://picsum.photos/100/100',
    extensions,
    validateOption: {
      limitSize: fileSizeToByte(20, 'MB'),
    }
  });

  return (
    <>
      <InputFile style={{
        display: 'inline-block',
        width: 100,
        height: 100,
        border: '3px solid black'
      }} {...inputFileProps}>파일등록</InputFile>
      <button style={{background: 'red', width: 100, height: 30}}>제출</button>

      {!preview ? null : (
        <div style={{position: 'relative', display: 'inline-block'}}>
          <Image src={preview.src} width={100} height={100} alt={preview.alt} />
          <button onClick={() => removeItem()} style={{position: 'absolute', right: 0, top: 0}}>
            X
          </button>
        </div>
      )}
    </>
  );
}

const extensions = ['.jpg', '.png'];
