import React, {ComponentProps, MouseEvent, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {ZINDEXS} from '../../utils/style/layout';

export interface ModalProp extends Omit<ComponentProps<'div'>, 'ref' | 'onClick'> {
  onBackgroundClick?: () => void;
  visible: boolean;
}

export default function Modal({onBackgroundClick, visible, ...rest}: ModalProp) {

  const onBackClick = useCallback(() => {
    onBackgroundClick?.();
  }, [onBackgroundClick]);

  const onInnerClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  useEnableBodyScroll(!visible);

  return (
      <Background className={visible ? 'visible' : ''} onClick={onBackClick}>
        <Inner onClick={onInnerClick} {...rest}/>
      </Background>
  );
}

function useEnableBodyScroll(enable: boolean) {
  
  useEffect(() => {
    if(enable) {
      document.body.style.overflow = "auto";
      
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [enable]);
}

const Background = styled.div`
  z-index: ${ZINDEXS.modal};
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
