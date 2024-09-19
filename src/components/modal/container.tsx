'use client';

import {ComponentPropsWithoutRef, MouseEvent, useCallback, useEffect, useRef} from 'react';
import styles from './container.module.scss';
import classNames from 'classnames';
import {createPortal} from 'react-dom';
import {EssentialModalProps} from '@/utils/extend/modal';

export interface ModalContainerProps extends EssentialModalProps, Omit<ComponentPropsWithoutRef<'div'>, 'onClick'> {
  easilyClose?: boolean; // backdrop / esc 눌러서 모달 닫게 해주는 기능, default false
  type?: 'centerAlign' | 'bottomSheet' | 'fullScreen'; // default centerAlign
  size?: 'large' | 'medium'; // centerAlign 모달에서만 사용함
  disableOpenFocus?: boolean; // open 시 젤 위에있는 포커스받을 수 있는 요소에 포커스 가는 기능 비활성화 default false

  /**
   * bottomSheet 모달에서는 boolean 으로 전달, 나머지는 전달할 필요는 없지만 만약 전달한 경우, 값에 따라 동작됨.
   * bottomSheet 모달은 Store 모달이 아닌 State 모달로 사용하기.
   * 나머지 모달은 Store / State모달 둘 다 의도대로 동작함.
   *
   * 이 모든것의 근본적인 이유는,
   * 1. bottomSheet는 애니메이션 때문에 항상 렌더링되어있어야 하고 (끄더라도...)
   * 2. 나머지는 뜰 때 마운트, 닫힐 때 언마운트 되도 상관없다는 차이로 인해 발생함.
   */
  open?: boolean;
}

// Alert, Confirm 등 모달 확장할 때 이 타입을 확장하기
export type ComposedModalProps = Omit<ModalContainerProps, 'type' | 'size'>;

export function ModalContainer({className, size = 'medium', type = 'centerAlign', easilyClose, onClose, open, disableOpenFocus = false, ...rest}: ModalContainerProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  /**
   * bottomSheet면 기본값 false로 동작하고
   * 나머지는 기본값 true로 동작함.
   */
  const _open = type === 'bottomSheet' ? !!open : open ?? true;

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

    const closeModal = () => {
      modal?.close();
      document.body.style.overflow = 'auto';
    };

    if (!_open) {
      closeModal();
      return;
    }

    modal?.showModal();
    document.body.style.overflow = 'hidden';

    return closeModal;
  }, [_open]);

  const onClickBackdrop = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!easilyClose) {
      return;
    }

    event.stopPropagation();
  }, [easilyClose]);

  // https://docs.google.com/document/d/16-Z3RmslEMvhfwOMmePYTRg4HkUjKjWSxxF2SB7NGGU/edit#heading=h.dpm2y2x8qp1i
  return createPortal((
    <dialog ref={modalRef} className={classNames(styles.rootModalContainer, styles[type + 'Container'], {[styles.open]: _open})} onClick={easilyClose ? onClose : undefined}>
      {!disableOpenFocus ? null : (<button className={styles.disableOpenFocus}/>)}
      <div className={classNames(styles.rootModalInner, styles[type + 'Inner'], styles[size], className)} onClick={onClickBackdrop} {...rest} />
    </dialog>
  ), document.body);
}
