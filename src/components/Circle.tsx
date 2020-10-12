import React, {ComponentProps} from 'react';
import styled from 'styled-components';

export interface CircleProp extends Omit<ComponentProps<'div'>, 'ref'> {

}

export default function Circle({...rest}: CircleProp) {

  return (
      <CircleStyle {...rest}>●</CircleStyle>
  );
}

const CircleStyle = styled.span`
  font-size: 12px;
`;
