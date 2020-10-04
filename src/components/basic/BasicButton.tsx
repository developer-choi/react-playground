import React, {ComponentProps} from 'react';
import styled from 'styled-components';

export interface BasicButtonProp extends Omit<ComponentProps<'button'>, 'ref'> {

}

export default function BasicButton({type = 'button', ...rest}: BasicButtonProp) {

  return (
      <StyledButton type={type} {...rest}/>
  );
}

const StyledButton = styled.button`

  //button을 링크로 만들때를 대비한 속성
  text-decoration: none;
  &:visited {
    color: initial;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

/** 요약
 * :hover 효과
 * :disabled 효과
 * :active 효과
 * 단, disabled 상태에서 hover 효과는 없애고, 마우스 커서 역시 바꾸기.
 *
 * 텍스트만 오면 중앙정렬
 * 텍스트 + 이미지가 와도 중앙정렬
 * 엔터를 쳐도 클릭과 동일한 작동
 * min-width + padding horizontal
 *
 * 링크버튼으로 만들었을 때 동일한 디자인을 보장해야함.
 * 1. font (button의 기본 font는 크롬기준 font: 400 13.3333px Arial; 이렇게 되어있더라) -- styled-reset이 해결해줌.
 * 2. :visit color (anchor는 이거있어서 제거해줘야함)
 * 3. text-decoration (anchor는 이거있어서 제거해줘야함)
 */

/**
 * disabled에 대해 잘 모르겠음.
 * 일단 네이버는 disabled 버튼 자체를 쓰지않고,
 * 누를 수 없는 상황(ex - 유효성검증이 통과안되서 폼 제출못하는 경우 버튼비활성화)일 경우
 * 버튼 활성화는 계속 해두되 눌렀을 때 눌렀을 때 에러팝업같은걸 보여주는 식으로 해결중임.
 * (네이버 - 회원가입폼, 로그인폼)
 * 다른 사이트의 비활성화 버튼이 쓰일만한 페이지를 못찾음
 *
 * 그리고 disabled가 켜져있으면
 * 1. 키보드로 포커스 이동했을 때 포커스를 받을 수 없었고,
 * 2. :hover로 스타일 적용했을 경우 여전히 hover 스타일이 적용되며,
 * 3. :active로 스타일 적용한거는 적용이 되지않더라.
 *
 * ==> 나는 disabled를 활용하기로 결정.
 * 1. 내가 구현하기 편하고, (조건에 안맞으면 버튼 자체를 못누르게 하면서 못누르는 버튼으로 보여주는것이, 눌렀을 때 처리하는 과정이 더 편함.)
 * 2. 누를 수 없는 버튼이 일반적이지 않은것도 아님. 흔함.
 */

/**
 * onclick handler를 등록하면, 포커스맞춰서 엔터눌러도 onclick handler가 작동된다.
 * 이건 html의 button 태그 기본 스펙인듯하다. html문서에서 테스트해도 그러네.
 */

/**
 * 또한, ThemeButton은 반드시 있는게 편한듯. 어느 사이트나 메인컬러가 들어간 버튼은 반드시 있으니까.
 */
