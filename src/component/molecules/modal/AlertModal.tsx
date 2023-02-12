import React, {MouseEvent, useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import type {ModalProp} from '@component/molecules/modal/Modal';
import Modal from '@component/molecules/modal/Modal';
import Button from '@component/atom/element/Button';

export interface AlertModalProp extends Omit<ModalProp, 'children'> {
  onConfirm?: (event: MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  content: string;
}

export default function AlertModal({closeModal, onConfirm = closeModal, title, content, ...rest}: AlertModalProp) {
  const _onConfirm = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (!onConfirm) {
      closeModal();
    } else {
      onConfirm(event);
    }

  }, [closeModal, onConfirm]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <Wrap closeModal={closeModal} {...rest}>
      {!title ? null : <Title>{title}</Title>}
      <Content>{content}</Content>
      <Button ref={buttonRef} onClick={_onConfirm}>확인</Button>
    </Wrap>
  );
}

const Wrap = styled(Modal)`
  padding: 30px;
  
  > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const Title = styled.span`
  display: block;
`;
const Content = styled.span`
  display: block;
`;
