import { ButtonProp } from 'react';
import styled from 'styled-components';

export const BasicButton = styled.button.attrs<ButtonProp>(() => ({type: 'button'}))`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  
  text-decoration: none;
  
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.3;
  }
`;
