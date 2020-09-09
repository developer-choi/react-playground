import React, {ComponentProps} from 'react';
import styled, {css} from 'styled-components';

export interface SpanProp extends Omit<ComponentProps<'span'>, 'ref'> {
  numberOfLines?: number;
}

export default function Span({style, numberOfLines = 0, ...rest}: SpanProp) {

  return (
      <SpanStyle numberOfLines={numberOfLines} style={{...style}} {...rest}/>
  );
}

const numberOfLinesCss = css<Pick<SpanProp, 'numberOfLines'>>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${props => props.numberOfLines};
`;

const SpanStyle = styled.span<Pick<SpanProp, 'numberOfLines'>>`
  ${props => (props.numberOfLines ?? 0) > 0 && numberOfLinesCss}
`;
