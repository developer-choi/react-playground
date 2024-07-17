'use client';

import {ComponentPropsWithoutRef, MouseEvent, PropsWithChildren, useCallback, useEffect, useRef} from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import {usePathname} from 'next/navigation';
import {EssentialModalProps} from '@/components/modal/ModalProvider';
import {useEffectFromTheSecondTime} from '@/utils/extend/library/react';
import {createPortal} from 'react-dom';

export interface ModalProps extends EssentialModalProps, Omit<ComponentPropsWithoutRef<'div'>, 'onClick' | 'children'> {
  easilyClose?: boolean; // backdrop / esc 눌러서 모달 닫게 해주는 기능, default false
}

// Modal은 반드시 Client Component에서만 사용할 수 있습니다.
export default function Modal({className, easilyClose, onClose, ...rest}: PropsWithChildren<ModalProps>) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffectFromTheSecondTime(useCallback(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]));

  useEffect(() => {
    const escHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (easilyClose) {
          onClose();
        } else {
          event.preventDefault();
        }
      }
    }

    document.addEventListener('keydown', escHandler);

    return () => {
      document.removeEventListener('keydown', escHandler);
    };
  }, [easilyClose, onClose]);

  useEffect(() => {
    const modal = modalRef.current;
    modal?.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      modal?.close();
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onClickModalContent = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  return createPortal((
    <dialog ref={modalRef} className={styles.modal} onClick={easilyClose ? onClose : undefined}>
      <div className={classNames(styles.modalInnerContainer, className)} onClick={onClickModalContent} {...rest} />
    </dialog>
  ), document.body);
}
