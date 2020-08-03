import React, {Dispatch, MouseEvent, PropsWithChildren, SetStateAction, useEffect} from 'react';
import styled from 'styled-components';

export interface BasicModalProp extends PropsWithChildren<{}>{
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  className?: string;
  easyClose?: boolean;
}

export default function BasicModal({className, children, visible, setVisible, easyClose = true}: BasicModalProp) {

  const onInnerClickBubble = easyClose ? (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  } : undefined;

  const onBackgroundClickBubble = easyClose ? () => {
    setVisible(false);
  } : undefined;

  useEffect(() => {

    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

  }, [visible]);

  return (
      <BackContainer visible={visible} onClick={onBackgroundClickBubble}>
        <InnerContainer className={className} onClick={onInnerClickBubble}>
          {children}
        </InnerContainer>
      </BackContainer>
  );
}

const BackContainer = styled.div<Pick<BasicModalProp, 'visible'>>`
  background: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  
  display: ${props => props.visible ? 'flex' : 'none'};
`;

const InnerContainer = styled.div`
  background: white;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
`;
