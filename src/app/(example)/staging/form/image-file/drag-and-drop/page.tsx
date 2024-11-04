'use client';

import {useMultipleFileImagePreview} from '@/utils/extend/file/file-converter';
import {fileSizeToByte} from '@/utils/extend/file/file-size';
import React from 'react';
import DragAndDrop from '@/components/form/DragAndDrop';
import styles from './page.module.scss';
import Image from 'next/image';

// URL: http://localhost:3000/staging/form/image-file/drag-and-drop
// Doc: https://docs.google.com/document/d/1_9-Bw4SihS6DGpskF8Xor_gaahHetDfKDk6QJeZQ6Ig/edit?tab=t.0
export default function DragAndDropPage() {
  const {list, inputFileProps} = useMultipleFileImagePreview({
    extensions,
    validateOption: {
      limitSize: fileSizeToByte(20, 'MB'),
      maxCount: 10,
      enableDuplicated: true
    }
  });

  return (
    <>
      <div className={styles.page}>
        <label style={{cursor: 'pointer'}}>
          <DragAndDrop className={styles.dropBox} enableFileExplorer {...inputFileProps}>
            <div className={styles.message}>Drop Here</div>
          </DragAndDrop>
        </label>
      </div>
      {list.map((extendedFile) => (
        <Image key={extendedFile.image.src} src={extendedFile.image.src} width={100} height={100} alt="user select image"/>
      ))}
    </>
  );
}

const extensions = ['.jpg', '.png', '.jfif'];
