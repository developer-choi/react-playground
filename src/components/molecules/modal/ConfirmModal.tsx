import React from 'react';
import styled from 'styled-components';
import Modal, {ModalProp} from '@components/molecules/modal/Modal';
import {Button} from '@components/atom/button/button-presets';

export interface ConfirmModalProp extends ModalProp {

}

export default function ConfirmModal({close, ...rest}: ConfirmModalProp) {
  
  return (
      <Wrap close={close} {...rest}>
        <Button onClick={close}>취소</Button>
        <Button onClick={close}>확인</Button>
      </Wrap>
  );
}

const Wrap = styled(Modal)`
  padding: 30px;
`;
