import React, {ComponentPropsWithoutRef, MouseEvent, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {isMatchKeyboardEvent} from '@util/extend/browser/keyboard-event';

export interface ModalProp extends Omit<ComponentPropsWithoutRef<'div'>, 'onClick'> {
  disableEasilyClose?: boolean;
  visible: boolean;
  close: () => void;
}

export default function Modal({disableEasilyClose = false, visible, close, ...rest}: ModalProp) {

  const onBackdropClick = useCallback(() => {
    if (!disableEasilyClose) {
      close();
    }
  }, [disableEasilyClose, close]);

  const onInnerClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const escToClose = (event: KeyboardEvent) => {
      if (!disableEasilyClose && isMatchKeyboardEvent(event, {key: 'Escape'})) {
        close();
      }
    };

    window.addEventListener('keydown', escToClose);

    return () => {
      window.removeEventListener('keydown', escToClose);
    };

  }, [visible, disableEasilyClose, close]);

  useEffect(() => {
    if(visible) {
      document.body.style.overflow = "hidden";
      document.body.focus();

    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  return (
      <Backdrop className={visible ? 'visible' : ''} onClick={onBackdropClick}>
        <Inner onClick={onInnerClick} {...rest}/>
      </Backdrop>
  );
}

const Backdrop = styled.div`
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  
  &.visible {
    display: flex;
  }
`;

const Inner = styled.div`
  margin: auto;
  background-color: white;
`;
