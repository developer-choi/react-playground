import React, {ComponentProps, MouseEvent, useCallback} from 'react';
import styled from 'styled-components';
import {useEnableBodyScroll} from '../../utils/custom-hooks/useEnableBodyScroll';
import {ZINDEXS} from '../../utils/style/layout';

export interface BasicModalProp extends Omit<ComponentProps<'div'>, 'ref' | 'onClick'> {
  onBackgroundClick?: () => void;
  visible: boolean;
}

export default function BasicModal({onBackgroundClick, visible, ...rest}: BasicModalProp) {

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
