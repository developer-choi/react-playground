import React, {PropsWithChildren, ReactNode} from 'react';
import styled from 'styled-components';

export interface BasicModalProp extends PropsWithChildren<{}> {
  visible: boolean;
  children: ReactNode;
  className?: string;
}

export default function BasicModal({visible, children, className}: BasicModalProp) {

  return (
      <BasicModalStyle className={`${visible ? 'active' : ''} ${className ?? ''}`}>
        <div className="innerContainer">
          {children}
        </div>
      </BasicModalStyle>
  );
}

const BasicModalStyle = styled.div`
  display: none;

  > .innerContainer {
    margin: auto;
    width: 80%;
    background: white;
  }

  &.active {
    display: flex;
    align-items: center;

    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
`;
