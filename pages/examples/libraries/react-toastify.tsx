import React, {useCallback} from 'react';
import Button from '@component/atom/button/Button';
import {toast} from 'react-toastify';

export default function ReactToastifyPage() {
  
  const openDefaultToast = useCallback(() => {
    toast.info('Default Toast');
  }, []);
  const openErrorToast = useCallback(() => {
    toast.error('Error Toast');
  }, []);
  return (
    <>
      <Button onClick={openDefaultToast}>Default Toast</Button>
      <Button onClick={openErrorToast}>Error Toast</Button>
    </>
  );
}
