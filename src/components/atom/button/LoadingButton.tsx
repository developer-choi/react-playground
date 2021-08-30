import React, { ComponentProps } from 'react';
import ButtonExtend from './ButtonExtend';
import styled from 'styled-components';
import { myClassName } from '../../../utils/libraries/classnames';
import Loading, { LoadingProps } from '@components/atom/Loading';

export type LoadingButtonProp = ComponentProps<'button'> & Omit<LoadingProps, keyof ComponentProps<'div'>>;

export default function LoadingButton({children, className, loading, disabled, ...rest}: LoadingButtonProp) {
  return (
      <Wrap disabled={disabled || loading} className={myClassName({loading}, className, 'center')} {...rest}>
        {children}
        {loading && <Loading className="loader" loading={loading}/>}
      </Wrap>
  );
}

const Wrap = styled(ButtonExtend)`
  position: relative;
  
  .loader {
    position: absolute;
  }
  
  &.loading {
    cursor: progress;
    color: transparent;
    
    >:not(.loader) {
      visibility: hidden;
    }
  }
`;
