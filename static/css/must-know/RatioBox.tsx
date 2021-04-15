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

const Wrap = styled.div`
  position: relative;
  width: 100%;
  //overflow: hidden;
`;

const Ratio = styled.div<{ aspectRatio: number; }>`
  width: 100%;
  padding-top: ${props => 100 / props.aspectRatio}%;
`;

const ChildrenWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
