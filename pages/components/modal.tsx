import React, {useCallback} from 'react';
import Button from '@component/atom/element/Button';
import {useDispatchOpenModal} from '@store/reducers/modal';
import AlertModal from '@component/molecules/modal/AlertModal';

export default function Page() {
  const {openModal, openAlertModal} = useDispatchOpenModal();

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
    openAlertModal({
      content: "World",
      disableEasilyClose: true
    });
  }, [openAlertModal]);

  return (
    <>
      <Button onClick={onClick}>Open modal</Button>
      <Button onClick={onClick2}>Open Alert modal</Button>
    </>
  );
}
