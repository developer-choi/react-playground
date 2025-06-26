'use client';

import {useCallback, useState} from 'react';
import {snackBar} from '@/components/toast';
import Button from '@/components/element/Button';
import {snackBarProfile} from '@/components/toast/SnackBarProfile';

/**
 * 목적 > 광클 해도 토스트가 최대 1개만 뜰 수 있도록 하는 방법을 구현했음.
 * URL: http://localhost:3000/experimental/duplicated-toast
 * Doc: https://docs.google.com/document/d/1Z78cJFrCNLm1rFeMIA7y64o6E84yJ4H_hNCVCdjztCM/edit#heading=h.4h61jm8200i1
 */
export default function Page() {
  const [count, setCount] = useState(1);
  
  const increase = useCallback(() => {
    setCount(prevState => prevState + 1);
  }, []);
  
  const onClick = useCallback(() => {
    if (Math.random() > 0.5) {
      snackBarProfile({
        name: 'Kevin',
        message: 'Hello, How are you?',
        profileImage: 'https://picsum.photos/36/36'
      }, {
        updateId: 'toast',
        toastId: 'toast',
        position: 'bottom-center'
      });
    } else {
      snackBar(count.toString(), {
        closeIcon: true,
      }, {
        updateId: 'toast',
        toastId: 'toast',
        position: 'bottom-center'
      });
    }

    increase();
  }, [count, increase]);

  return (
    <Button onClick={onClick}>랜덤 토스트 띄우기</Button>
  );
}
