'use client';

import React from 'react';
import styles from './page.module.scss';
import {useClickOutside} from '@/utils/extend/click-outside';

// URL: http://localhost:3000/experimental/click-outside/tutorial
export default function Page() {
  const {wrapperRef} = useClickOutside<HTMLDivElement>({
    callback: () => {
      alert('Click outside');
    }
  });

  return (
    <div ref={wrapperRef} className={styles.someBox}>
      Try click outside
    </div>
  );
}
