'use client';

import {useCallback, useState} from 'react';
import {snackBar} from '@/components/toast';
import {cssTransition} from 'react-toastify';
import styles from './page.module.scss';
import Button from '@/components/element/Button';

/**
 * 목적 > 광클 해도 토스트가 최대 1개만 뜰 수 있도록 하는 방법을 구현했음.
 * 한계 > 생각해보니, 토스트를 완전히 다른종류로 다르게 띄우는 부분은 검증을 못해봄. (한 페이지안에 토스트 뜨는 버튼이 2개 이상이고, 하나는 텍스트 하나는 프로필 토스트 이런식)
 */
// URL : http://localhost:3000/experimental/duplicated-toast
// Doc : https://docs.google.com/document/d/1Z78cJFrCNLm1rFeMIA7y64o6E84yJ4H_hNCVCdjztCM/edit#heading=h.4h61jm8200i1
export default function Page() {
  const [count, setCount] = useState(1);
  
  const animation = cssTransition({
    enter: styles.fadeIn,
    exit: styles.fadeOut
  });

  const increase = useCallback(() => {
    setCount(prevState => prevState + 1);
  }, []);
  
  const onClick = useCallback(() => {
    snackBar(count.toString(), {
      closeIcon: true,
    }, {
      transition: animation,
      updateId: 'toast',
      toastId: 'toast',
      position: 'bottom-center'
    });

    increase();
  }, [animation, count, increase]);

  return (
    <Button onClick={onClick}>Default (text)</Button>
  );
}
