import React, {ComponentProps} from 'react';
import styled from 'styled-components';

export interface H2Prop extends ComponentProps<'h2'> {

}

export default function H2({...rest}: H2Prop) {

  return (
      <H2Style {...rest}/>
  );
}

const H2Style = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;
