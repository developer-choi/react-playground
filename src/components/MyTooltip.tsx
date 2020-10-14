import React, {ComponentProps} from 'react';
import styled from 'styled-components';

export interface MyTooltipProp extends Omit<ComponentProps<'div'>, 'ref'> {
  content: string;
}

export default function MyTooltip({children, content, ...rest}: MyTooltipProp) {

  return (
      <Wrap {...rest}>
        {children}
        <Inner>
          {content}
        </Inner>
      </Wrap>
  );
}

const Inner = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  color: white;
  margin-top: 10px;
  background-color: black;
  padding: 10px;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
`;

const Wrap = styled.div`
  position: relative;
  
  &:hover > ${Inner} {
    opacity: 1;
    visibility: visible;
  }
`;
