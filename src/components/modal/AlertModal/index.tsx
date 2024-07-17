import styles from './index.module.scss';
import Modal, {ModalProps} from '@/components/modal';
import {CloseModalCallback} from '@/components/modal/ModalProvider';
import React from 'react';

export interface AlertModalProps extends ModalProps {
  title?: string;
  content: string;
  onConfirm?: (onClose: CloseModalCallback) => void
}

export default function AlertModal({title, content, onClose, onConfirm, ...rest}: AlertModalProps) {
  return (
    <Modal className={styles.modal} onClose={onClose} {...rest}>
      {!title ? null : <span className={styles.title}>{title}</span>}
      <span className={styles.content}>{content}</span>
      <button onClick={!onConfirm ? onClose : () => onConfirm(onClose)}>Confirm</button>
    </Modal>
  );
}
