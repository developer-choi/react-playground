import React, {useCallback} from 'react';
import Button from '@component/atom/element/Button';
import {useDispatchOpenModal} from '@store/reducers/modal';
import AlertModal from '@component/molecules/modal/AlertModal';

// URL: http://localhost:3000/experimental/components/modal
export default function Page() {
  const {openModal, openConfirmModal, openAlertModal} = useDispatchOpenModal();

  const onClick = useCallback(() => {
    openModal({
      Component: AlertModal,
      props: {
        title: '123',
        content: 'abc'
      }
    });
  }, [openModal]);

  const onClick2 = useCallback(() => {
    openAlertModal("World");
  }, [openAlertModal]);

  const onClick3 = useCallback(() => {
    openConfirmModal({
      content: "World",
      disableEasilyClose: true,
      onConfirm: (closeModal) => {
        alert('Confirmed');
        closeModal();
      }
    });
  }, [openConfirmModal]);

  return (
    <>
      <Button onClick={onClick}>Open modal</Button>
      <Button onClick={onClick2}>Open Alert modal</Button>
      <Button onClick={onClick3}>Open Confirm modal</Button>
    </>
  );
}
