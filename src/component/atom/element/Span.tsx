import React, {ComponentPropsWithoutRef} from 'react';
import styled, {css} from 'styled-components';

export interface SpanProp extends ComponentPropsWithoutRef<'span'> {
  numberOfLines?: number;
}

export default function Span({numberOfLines = 0, ...rest}: SpanProp) {

  return (
      <SpanStyle numberOfLines={numberOfLines} {...rest}/>
  );
}

const numberOfLinesCss = css<Pick<SpanProp, 'numberOfLines'>>`
  //numberOfLines 기능이 작동되려면 display는 반드시 이것이 되야함.
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${props => props.numberOfLines};
  
  //이거 안하면 공백없는 긴 문자열이 올 경우 의도하지않은 대로 작동함. 화면을 뚫고나간다던가.
  word-break: break-word;
  
  //이거 안하면 _랑 g같이 밑으로 가는 글자가 짤림. overflow: hidden;때문에.
  line-height: normal;
`;

const SpanStyle = styled.span<Pick<SpanProp, 'numberOfLines'>>`
  ${props => (props.numberOfLines ?? 0) > 0 && numberOfLinesCss}
`;
