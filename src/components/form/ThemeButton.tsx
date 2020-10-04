import React from 'react';
import styled from 'styled-components';
import BasicButton, {BasicButtonProp} from '../basic/BasicButton';

export interface StyledButtonProp extends BasicButtonProp {

}

export default function ThemeButton(props: StyledButtonProp) {

  return (
      <StyledButton {...props}/>
  );
}

const StyledButton = styled(BasicButton)`
    
  min-width: 60px;
  padding: 10px;
  color: ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.reactBlue};
  
  //button을 링크로 만들때를 대비한 속성
  &:visited {
    color: ${props => props.theme.colors.black};
  }
  
  &:hover:not(:disabled) {
    opacity: 0.7;
  }
  
  /**
   * style 우선 적용 순위에 따라, 적용 순서는 hover < active < disabled 순서로 와야함.
   * 그러나 hover에서 :not으로 좀 더 구체적으로 selector를 지정했기에 :active로만 selector를 지정하면 우선순위에서 밀리는 문제가 이썽서
   * active도 동일하게 지정했음. 
   * 그대신 button은 disabled일 때 :active가 적용이 안되는건 인지해야함. 순수하게 스타일속성 우선순위(?) 때문에 이렇게 작성한 것.  
   */
  //&:active {
  &:active:not(:disabled) {
    opacity: 1;
  }
  
  &:disabled {
    background-color: lightgray;
  }
`;
