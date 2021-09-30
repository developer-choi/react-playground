import React, {MouseEvent, useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Modal, {ModalProp} from '@component/molecules/modal/Modal';
import {Button} from '@component/atom/button/button-presets';

export interface ConfirmModalProp extends Omit<ModalProp, 'children'> {
  title: string;
  content: string;
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
  onConfirm?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ConfirmModal({close, title, content, onCancel = close, onConfirm = close, visible, ...rest}: ConfirmModalProp) {
  
  const _onCancel = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (!onCancel) {
      close();
    } else {
      onCancel(event);
    }
  }, [onCancel, close]);
  
  const _onConfirm = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (!onConfirm) {
      close();
    } else {
      onConfirm(event);
    }
  }, [onConfirm, close]);
  
  const confirmRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (visible) {
      confirmRef.current?.focus();
    }
  }, [visible]);
  
  return (
      <Wrap close={close} visible={visible} {...rest}>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Button onClick={_onCancel}>취소</Button>
        <Button ref={confirmRef} onClick={_onConfirm}>확인</Button>
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
  font-size: 16px;
`;
const Content = styled.span`
  display: block;
  font-size: 14px;
`;
