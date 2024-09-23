import {ComposedModalProps, ModalContainer} from '@/components/modal/container';
import React, {useCallback} from 'react';
import {CloseModalCallback} from '@/utils/extend/modal';
import {DefaultModalHeader} from '@/components/modal/header';
import {OneButtonModalFooter} from '@/components/modal/footer';
import DefaultModalBody from '@/components/modal/body';
import typographyStyles from '@/styles/typography.module.scss';

export interface AlertModalProps extends ComposedModalProps {
  title: string;
  content: string;
  confirm?: {
    onClick?: (onClose: CloseModalCallback) => void;
    children?: string;
    // 추후 풀커스텀이 필요해지는 그 때 props 추가
  };
  visibleHeaderClose?: boolean; // default false
}

export default function AlertModal({title, content, onClose, confirm, visibleHeaderClose, ...rest}: AlertModalProps) {
  const onConfirmWithDefault = useCallback(() => {
    if (confirm?.onClick) {
      confirm.onClick(onClose);
    } else {
      onClose();
    }
  }, [confirm, onClose]);
  
  return (
    <ModalContainer onClose={onClose} {...rest}>
      <DefaultModalHeader onClose={visibleHeaderClose ? onClose : undefined}>{title}</DefaultModalHeader>
      <DefaultModalBody className={typographyStyles.body1}>
        {content}
      </DefaultModalBody>
      <OneButtonModalFooter buttonText={confirm?.children ?? 'Confirm'} onClick={onConfirmWithDefault} />
    </ModalContainer>
  );
}
