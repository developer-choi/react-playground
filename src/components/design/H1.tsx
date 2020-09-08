import React, {ComponentProps} from 'react';
import styled from 'styled-components';

export interface H1Prop extends ComponentProps<'h1'> {

}

export default function H1({...rest}: H1Prop) {

  return (
      <H1Style {...rest}/>
  );
}

const H1Style = styled.h1`
  font-size: 60px;
  font-weight: bold;
`;
