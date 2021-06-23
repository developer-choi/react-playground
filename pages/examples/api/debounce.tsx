import React, {useCallback} from 'react';
import Head from 'next/head';
import {Button} from '@components/atom/button/button-presets';
import useDebouncedCallback from '../../../src/utils/custom-hooks/useDebouncedCallback';

export default function DebouncePage() {
  
  const onClick = useDebouncedCallback(useCallback(() => {
    console.log('clicked');
  }, []));
  
  return (
      <>
        <Head>
          <title>debounce</title>
        </Head>
        <div>
          <Button onClick={onClick}>광클버튼</Button>
        </div>
      </>
  );
}
