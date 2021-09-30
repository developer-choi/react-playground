import React, {ComponentProps, MouseEvent, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {isMatchKeyboardEvent} from '@util/extend/keyboard-event';

export interface ModalProp extends Omit<ComponentProps<'div'>, 'ref' | 'onClick'> {
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  visible: boolean;
  close: () => void;
}

export default function Modal({disableBackdropClick = false, disableEscapeKeyDown = false, visible, close, ...rest}: ModalProp) {

  const onBackdropClick = useCallback(() => {
    if (!disableBackdropClick) {
      close();
    }
  }, [disableBackdropClick, close]);

  const onInnerClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);
  
  useEffect(() => {
    const escToClose = (event: KeyboardEvent) => {
      if (!disableEscapeKeyDown && isMatchKeyboardEvent(event, {key: 'Escape'})) {
        close();
      }
    };
  
    window.addEventListener('keydown', escToClose);
  
    return () => {
      window.removeEventListener('keydown', escToClose);
    };
    
  }, [visible, disableEscapeKeyDown, close]);
  
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
