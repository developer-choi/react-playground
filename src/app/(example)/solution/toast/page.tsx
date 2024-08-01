'use client';

import {useCallback} from 'react';
import {snackBar} from '@/components/toast';
import {snackBarProfile} from '@/components/toast/SnackBarProfile';

// URL: http://localhost:3000/solution/toast
// Doc : https://docs.google.com/document/d/1Z78cJFrCNLm1rFeMIA7y64o6E84yJ4H_hNCVCdjztCM/edit#heading=h.4h61jm8200i1
export default function Page() {
  const onClick = useCallback(() => {
    snackBar('aaaaaaaaaaaaaaaaaaaaaaaaaaaa', {
      closeIcon: true
    });
    snackBar('Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World', {
      closeIcon: true
    });
    snackBarProfile({
      name: 'Kevin',
      message: 'Hello, How are you?',
      profileImage: 'https://picsum.photos/36/36'
    });
  }, []);

  return (
    <button onClick={onClick}>Default (text)</button>
  );
}
