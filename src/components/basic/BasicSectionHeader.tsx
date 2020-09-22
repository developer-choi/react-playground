import React, {ComponentProps} from 'react';
import styled from 'styled-components';
import {SpaceBetween} from '../utils/style';

export interface BasicSectionHeaderProp extends Omit<ComponentProps<'div'>, 'ref'> {
  headerText: string;
}

export default function BasicSectionHeader({headerText, children, ...rest}: BasicSectionHeaderProp) {

  return (
      <BasicHeaderWrap {...rest}>
        <BasicHeaderText>{headerText}</BasicHeaderText>
        {children}
      </BasicHeaderWrap>
  );
}

export const BasicHeaderWrap = styled(SpaceBetween)`
  
`;

export const BasicHeaderText = styled.h2`
  
`;
