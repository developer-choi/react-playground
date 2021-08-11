import React, {ComponentProps, useCallback, useState} from 'react';
import ButtonExtend from './ButtonExtend';
import ClipLoader from 'react-spinners/ClipLoader';
import type {LoaderSizeProps} from 'react-spinners/interfaces';
import styled from 'styled-components';
import {absoluteCenter} from '../../../utils/style/css';
import {myClassName} from '../../../utils/libraries/classnames';

export interface LoadingButtonProp extends Omit<ComponentProps<'button'>, 'onClick'>, Pick<LoaderSizeProps, 'size' | 'color'> {
  loadingAfterClick: () => Promise<void>;
}

export default function LoadingButton({loadingAfterClick, children, className, size, color, disabled, ...rest}: LoadingButtonProp) {
  
  const [loading, setLoading] = useState(false);
  
  const onClick = useCallback(async () => {
    console.log('clicked');
    try {
      setLoading(true);
      await loadingAfterClick();
    } finally {
      setLoading(false);
    }
  }, [loadingAfterClick]);
  
  return (
      <Wrap onClick={onClick} disabled={disabled || loading} className={myClassName({loading}, className)} {...rest}>
        <div id="children">{children}</div>
        <LoaderWrap>
          <ClipLoader loading={loading} size={size} color={color}/>
        </LoaderWrap>
      </Wrap>
  );
}

const Wrap = styled(ButtonExtend)`
  position: relative;
  &.loading {
    cursor: progress;
    
    #children {
      visibility: hidden;
    }
  }
`;

const LoaderWrap = styled.div`
  ${absoluteCenter};
`;
