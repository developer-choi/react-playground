import React from 'react';
import styled from 'styled-components';
import BasicRadioButton, {BasicRadioButtonProp} from './BasicRadioButton';

export default function StyledRadioBox({...rest}: BasicRadioButtonProp) {

  return (
      <StyledRadioButton {...rest}/>
  );
}

const StyledRadioButton = styled(BasicRadioButton)`
  
  &:after {
  
  }
  
  > .label-text {
  }
  
  &.active:after {
  }
  
  &.active > .label-text {
  }
`;
