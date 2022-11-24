import React from 'react';
import {COLORS} from '@util/style/theme';
import styled, {css} from 'styled-components';

const buttonHoverEffect = css`
  //hover, active, disabled는 이 순서로 선언이 되야 opacity가 직관적으로 작동함.
  :hover {
    opacity: 0.7;
  }
  
  :active {
    opacity: 1;
  }
  
  :disabled {
    opacity: initial;
  }
`;

const someButtonColorTemplate = css`
  color: white;
  background-color: red;
  
  :disabled {
    background-color: lightcoral;
  }
`;

const grayColorTemplate = css`
  color: white;
  background: ${COLORS.gray1};
`;

const Button = styled.button`
  padding: 8px 15px;
  min-width: 90px;
  border-radius: 5px; //size에는 border-radius도 포함되고,
  flex-shrink: 0; //버튼들 중에는 길이가 줄어들면 안되는 경우도 있어서 여기에 선언한다.
  background-color: ${props => props.theme.main};
  color: white;
  
  //<SomeButton as='a'로 만들 때 필요한 css
  a& {
    // button은 이 값이 기본값이지만, a tag는 아님.
    text-align: center;
    line-height: normal;
  }
  
  :disabled {
    cursor: not-allowed;
  }
  
  &.hover-effect {
    ${buttonHoverEffect};
  }
  
  //color template을 클래스 이름으로 적용할 수 있도록 함.
  &.some-color-class-name {
    ${someButtonColorTemplate};
  }
  
  &.gray {
    ${grayColorTemplate}
  }
  
  //주로 이미지를 button으로 감쌀 때 쓰는데, 버튼안에 오는 이미지가 중앙정렬을 시키려고 할 때 씀.
  &.center {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Button;