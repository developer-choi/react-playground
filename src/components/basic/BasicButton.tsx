import React, {ButtonHTMLAttributes} from 'react';
import styled from 'styled-components';

export interface BasicButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export default function BasicButton({children, ...rest}: BasicButtonProp) {

  return (
      <ButtonStyle theme={{lightPointColor: 'red'}} {...rest}>
        {children}
      </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  background: ${props => props.theme.lightPointColor};
  color: ${props => props.theme.assistPointColor};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  
  &:active {
    opacity: 0.7;
  }
`;
