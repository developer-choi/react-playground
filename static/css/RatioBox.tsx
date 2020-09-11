import React, {ComponentProps} from 'react';
import styled from 'styled-components';

export interface RatioBoxProp extends Omit<ComponentProps<'div'>, 'ref'> {
  aspectRatio: number;
}

export default function RatioBox({children, aspectRatio, ...rest}: RatioBoxProp) {

  return (
      <Wrap {...rest}>
        <Ratio aspectRatio={aspectRatio}/>
        <ChildrenWrap>
          {children}
        </ChildrenWrap>
      </Wrap>
  );
}

export function getAspectRatio(widthRatio: number, heightRatio: number) {
  return heightRatio / widthRatio;
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Ratio = styled.div<{ aspectRatio: number; }>`
  width: 100%;
  padding-top: ${props => props.aspectRatio * 100}%;
`;

const ChildrenWrap = styled.div`
  position: absolute;
  top: 0; // ??
  left: 0; // ?? absolute해놓고 left top 안했더니 원래 요소가 배치되는 곳이 기준이 되는구나..
`;
