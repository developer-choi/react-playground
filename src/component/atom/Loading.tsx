import type {ComponentPropsWithoutRef} from 'react';
import styled, {keyframes} from 'styled-components';
import {circleCss} from '@util/style/css';

export interface LoadingProps extends ComponentPropsWithoutRef<'div'> {
  loading?: boolean;
}

export default function Loading({ loading, ...rest }: LoadingProps) {
  if (loading) {
    return (
      <Loader {...rest}/>
    );
  }
  
  return null
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  ${circleCss(20)};
  border: 2px solid white;
  animation: ${rotate} infinite linear 1.2s;
  border-top-color: blue;
`;
