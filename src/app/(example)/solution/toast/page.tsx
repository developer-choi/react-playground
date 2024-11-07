'use client';

import {useCallback} from 'react';
import {snackBar} from '@/components/toast';
import {snackBarProfile} from '@/components/toast/SnackBarProfile';
import Button from '@/components/element/Button';

// URL: http://localhost:3000/solution/toast
// Doc : https://docs.google.com/document/d/1Z78cJFrCNLm1rFeMIA7y64o6E84yJ4H_hNCVCdjztCM/edit#heading=h.4h61jm8200i1
export default function Page() {
  const onClickWithClose = useCallback(() => {
    snackBar('hello world'.repeat(5), {
      closeIcon: true
    });
  }, []);

  const onClickWithoutClose = useCallback(() => {
    snackBar('hello world'.repeat(5), {
      closeIcon: false
    });
  }, []);

  const onClickProfile = useCallback(() => {
    snackBarProfile({
      name: 'Kevin',
      message: 'Hello, How are you?',
      profileImage: 'https://picsum.photos/36/36'
    });
  }, []);

  return (
    <>
      <Button onClick={onClickWithClose}>Text + close</Button>
      <Button onClick={onClickWithoutClose}>Text - close</Button>
      <Button onClick={onClickProfile}>Profile</Button>
    </>
  );
}
