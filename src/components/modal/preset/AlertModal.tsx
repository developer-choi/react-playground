import {ComposedModalProps, ModalContainer} from '@/components/modal/container';
import React, {useCallback} from 'react';
import {CloseModalCallback} from '@/utils/extend/modal';
import {DefaultModalHeader} from '@/components/modal/header';
import {OneButtonModalFooter} from '@/components/modal/footer';
import DefaultModalBody from '@/components/modal/body';

export interface AlertModalProps extends ComposedModalProps {
  title: string;
  content: string;
  confirm?: {
    onClick?: (onClose: CloseModalCallback) => void;
    children?: string;
    // 추후 풀커스텀이 필요해지는 그 때 props 추가
  };
}

export default function AlertModal({title, content, onClose, confirm, ...rest}: AlertModalProps) {
  const onConfirmWithDefault = useCallback(() => {
    if (confirm?.onClick) {
      confirm.onClick(onClose);
    } else {
      onClose();
    }
  }, [confirm, onClose]);
  
  return (
    <ModalContainer type="centerAlign" onClose={onClose} {...rest}>
      <DefaultModalHeader>{title}</DefaultModalHeader>
      <DefaultModalBody>
        {content}
      </DefaultModalBody>
      <OneButtonModalFooter buttonText={confirm?.children ?? 'Confirm'} onClick={onConfirmWithDefault} />
    </ModalContainer>
  );
}
