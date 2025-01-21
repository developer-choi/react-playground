'use client';

import {fileSizeToByte} from '@/utils/extend/file/file-size';
import React, {useCallback} from 'react';
import InputFile from '@/components/form/Input/inputFile';
import Image from 'next/image';
import Link from 'next/link';
import {useMultipleImageFile} from '@/utils/extend/file/handle-image/state';
import Button from '@/components/element/Button';
import designSystemStyles from '@/styles/design-system.module.scss';
import classNames from 'classnames';

// URL: http://localhost:3000/staging/form/file/multiple
// Doc: https://docs.google.com/document/d/1_9-Bw4SihS6DGpskF8Xor_gaahHetDfKDk6QJeZQ6Ig/edit?tab=t.0
export default function Page() {
  const {list, inputFileProps, removeItem} = useMultipleImageFile({
    options: {
      limitSize: fileSizeToByte(20, 'MB'),
      maxCount: 10,
      enableDuplicated: true,
      extensions
    }
  });

  const onSubmit = useCallback(() => {
    console.log('list', list);
  }, [list]);

  return (
    <>
      <div>
        <Link href="/">Unmount 테스트용 다른 페이지 가는 링크</Link>
      </div>
      <div className={classNames(designSystemStyles.commonSubForm, 'row')}>
        <InputFile style={{display: 'inline-block', width: 100, height: 100, border: '3px solid black'}} {...inputFileProps}>파일등록</InputFile>
        <Button onClick={onSubmit}>제출</Button>
      </div>

      {list.map((preview) => (
        <div key={preview.id} style={{position: 'relative', display: 'inline-block'}}>
          <Image src={preview.image.src} width={100} height={100} alt={preview.image.alt} />
          <button onClick={() => removeItem(preview)} style={{position: 'absolute', right: 0, top: 0}}>
            X
          </button>
        </div>
      ))}
    </>
  );
}

const extensions = ['.jpg', '.png'];
