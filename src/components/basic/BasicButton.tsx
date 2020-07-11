import React, {ButtonHTMLAttributes} from 'react';
import styled from 'styled-components';
import {LIGHT_POINT_COLOR} from '../color';

export interface BasicButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const ButtonStyle = styled.button`
  background: ${LIGHT_POINT_COLOR};
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  
  &:active {
    opacity: 0.7;
  }
`;

export default function BasicButton({children, ...rest}: BasicButtonProp) {

  return (
      <ButtonStyle {...rest}>
        {children}
      </ButtonStyle>
  );
}
