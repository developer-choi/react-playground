import React, {ComponentProps, MouseEvent, useCallback, useEffect} from 'react';
import styled from 'styled-components';

export interface ModalProp extends Omit<ComponentProps<'div'>, 'ref' | 'onClick'> {
  disableEasilyClose?: boolean;
  onBackdropClick?: () => void;
  visible: boolean;
  close: () => void;
}

export default function Modal({onBackdropClick, disableEasilyClose = false, visible, close, ...rest}: ModalProp) {

  const _onBackdropClick = useCallback(() => {
    onBackdropClick?.();
    if (!disableEasilyClose) {
      close();
    }
  }, [onBackdropClick, disableEasilyClose, close]);

  const onInnerClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);
  
  useEffect(() => {
    const escToClose = (event: KeyboardEvent) => {
      if (!disableEasilyClose && event.key === 'Escape') {
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
      <Backdrop className={visible ? 'visible' : ''} onClick={disableEasilyClose ? undefined : _onBackdropClick}>
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
