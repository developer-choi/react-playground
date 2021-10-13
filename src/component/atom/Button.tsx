import React, {ComponentPropsWithoutRef, forwardRef, ReactNode, Ref} from 'react';
import styled from 'styled-components';

export interface ButtonProp extends ComponentPropsWithoutRef<'button'>{
  size?: 'small' | 'medium' | 'large';
  variant?: 'cntained' | 'outlined' | 'text';
  color?: 'primary' | 'lightgray';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default forwardRef(function Button({...rest}: ButtonProp, ref: Ref<HTMLButtonElement>) {
  
  return (
    <Wrap ref={ref} {...rest}/>
  );
});

const Wrap = styled.button`
`;
