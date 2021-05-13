import React, {useCallback, MouseEvent, useRef, ComponentProps, Ref, forwardRef} from 'react';
import styled, {keyframes} from 'styled-components';

export default forwardRef(function RippleButton(props: ComponentProps<'button'>, ref: Ref<HTMLButtonElement>) {
  const {onClick} = props;
  
  console.log(ref);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const _onClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const {nativeEvent: {offsetY, offsetX}} = event;
    
    const newElement = document.createElement('div');
    newElement.classList.add('ripple');
    newElement.style.left = `${offsetX}px`;
    newElement.style.top = `${offsetY}px`;
    buttonRef.current?.appendChild(newElement);
    
    setTimeout(() => {
      buttonRef.current?.removeChild(newElement);
    }, DURATION * 1000);
  
    onClick?.(event);
  }, [onClick]);
  
  return (
      <Button ref={buttonRef} onClick={_onClick}>
        Click Me
      </Button>
  );
});

const DURATION = 1.5;

const rippleAnimate = keyframes`
  from {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  
  to {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
`;


const Button = styled.button`
  padding: 10px 40px;
  font-size: 18px;
  background: red;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  
  position: relative;
  overflow: hidden;
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: white;
    transition: all, 1s;
    pointer-events: none; /*이거를 준 이유에 대해 한번 생각해봐야함.*/
    transform: translate(-50%, -50%);
    
    animation: ${rippleAnimate} ${DURATION}s;
  }
`;
