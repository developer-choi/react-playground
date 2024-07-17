'use client';

import {useCallback} from 'react';
import AlertModal from '@/components/modal/AlertModal';
import {useOpenModal} from '@/components/modal/ModalProvider';
import {useToggle} from '@/utils/extend/library/react';
import styles from './page.module.scss';

// URL: http://localhost:3000/solution/etc/modal
// Doc: https://docs.google.com/document/d/16-Z3RmslEMvhfwOMmePYTRg4HkUjKjWSxxF2SB7NGGU/edit
export default function Page() {
  const {openModal, openAlertModal} = useOpenModal();

  const onClick = useCallback(() => {
    openModal({
      Component: AlertModal,
      props: {
        title: '123',
        content: 'abc',
        easilyClose: true
      }
    });
  }, [openModal]);

  const onClick2 = useCallback(() => {
    openAlertModal("World");
  }, [openAlertModal]);

  const onParentClick = useCallback(() => {
    console.log('event bubbled');
  }, []);

  return (
    <div onClick={onParentClick}>
      <button onClick={onClick}>Open modal</button>
      <button onClick={onClick2}>Open Alert modal</button>
      <StateModal/>
    </div>
  );
}

// child selector로 모달이 영향받는지 테스트
function StateModal() {
  const {bool: visible, setTrue: openModal, setFalse: closeModal} = useToggle();

  return (
    <div className={styles.stateWrap}>
      {!visible ? null : <AlertModal content="State modal" onClose={closeModal}/>}
      <button onClick={openModal}>Open state modal</button>
    </div>
  )
}
