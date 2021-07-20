import type {ComponentProps} from 'react';
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

const ButtonExtend = styled.button.attrs(({type = 'button', ...rest}: ComponentProps<'button'>) => ({type, ...rest}))`
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
  .some-color-class-name {
    ${someButtonColorTemplate};
  }
  
  //주로 이미지를 button으로 감쌀 때 쓰는데, 버튼안에 오는 이미지가 중앙정렬을 시키려고 할 때 씀.
  &.center {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;

export default ButtonExtend;
