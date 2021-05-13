import React, {AnimationEvent, ComponentProps, forwardRef, MouseEvent, Ref, useCallback, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import ButtonExtend from '@components/atom/button/ButtonExtend';
import classNames from 'classnames';

export default forwardRef(function WrongButton(props: ComponentProps<'button'>, ref: Ref<HTMLButtonElement>) {
  const {className, onClick, onAnimationEnd, ...rest} = props;
  
  const [active, setActive] = useState(false);
  const buttonClass = classNames({active}, className);
  
  const _onClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setActive(true);
    onClick?.(event);
  }, [onClick]);
  
  const _onAnimationEnd = useCallback((event: AnimationEvent<HTMLButtonElement>) => {
    setActive(false);
    onAnimationEnd?.(event);
  }, [onAnimationEnd]);
  
  return (
      <Button ref={ref} className={buttonClass} onClick={_onClick} onAnimationEnd={_onAnimationEnd} {...rest}>
        Click Me
      </Button>
  );
});

const vibrateAnimate = keyframes`
  from {
    transform: translateX(-15px);
  }
  
  to {
    transform: translateX(15px);
  }
`;

const Button = styled(ButtonExtend)`
  padding: 10px 40px;
  background: red;
  color: white;
  border-radius: 20px;
  font-size: 20px;
  
  &.active {
    animation: ${vibrateAnimate} 0.1s alternate linear;
    animation-iteration-count: 8;
  }
`;
