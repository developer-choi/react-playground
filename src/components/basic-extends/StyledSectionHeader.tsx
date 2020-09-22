import React, {ComponentProps} from 'react';
import styled from 'styled-components';
import {SpaceBetween} from '../utils/style';
import {BasicHeaderWrap, BasicSectionHeaderProp} from './BasicSectionHeader';

export default function StyledSectionHeader({headerText, children, ...rest}: BasicSectionHeaderProp) {

  return (
      <StyledWrap {...rest}>
        <StyledText>{headerText}</StyledText>
        {children}
      </StyledWrap>
  );
}

export const StyledWrap = styled(BasicHeaderWrap)`
  
`;

export const StyledText = styled(BasicHeaderWrap)`
  
`;
