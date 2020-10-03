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
 * 안에 텍스트가 와도, 텍스트 + 이미지가 와도 중앙정렬. (이거는 BasicButton이 아니라 StyledButton에 있어야함)
 *
 * BasicXXX에는 스타일관련 선언은 최소화해야함.
 */
