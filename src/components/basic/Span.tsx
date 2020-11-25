import React, {ComponentProps} from 'react';
import styled, {css} from 'styled-components';
import classNames from 'classnames';
import {useLocation} from 'react-router-dom';

export interface SpanProp extends Omit<ComponentProps<'span'>, 'ref'> {
  numberOfLines?: number;
  activePath?: string;
}

export default function Span({activePath, numberOfLines = 0, className, ...rest}: SpanProp) {

  const {pathname} = useLocation();
  const spanClass = classNames({active: activePath && pathname.startsWith(activePath)}, className);

  return (
      <SpanStyle numberOfLines={numberOfLines} className={spanClass} {...rest}/>
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
`;

const SpanStyle = styled.span<Pick<SpanProp, 'numberOfLines'>>`
  ${props => (props.numberOfLines ?? 0) > 0 && numberOfLinesCss}
`;
