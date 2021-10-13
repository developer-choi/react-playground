import React, {ComponentPropsWithoutRef} from 'react';
import ButtonExtend from '@component/atom/button/ButtonExtend';
import styled from 'styled-components';
import {myClassName} from '@util/libraries/classnames';
import Loading, {LoadingProps} from '@component/atom/Loading';

export type LoadingButtonProp = ComponentPropsWithoutRef<'button'> & Omit<LoadingProps, keyof ComponentPropsWithoutRef<'div'>>;

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
