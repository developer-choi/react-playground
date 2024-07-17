'use client';

import {useCallback} from 'react';
import AlertModal from '@/components/modal/AlertModal';
import {useOpenModal} from '@/components/modal/ModalProvider';

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

  return (
    <>
      <button onClick={onClick}>Open modal</button>
      <button onClick={onClick2}>Open Alert modal</button>
    </>
  );
}
