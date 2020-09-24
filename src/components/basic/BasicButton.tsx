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

/**
 * Button 구현이 필요한 내역
 * hover 효과
 * disabled 효과
 * 텍스트만 오면 중앙정렬
 * 텍스트 + 이미지가 와도 중앙정렬
 */
