import React, {useCallback, useState} from 'react';
import styled, {keyframes} from 'styled-components';

export default function WrongButton() {
  
  const [active, setActive] = useState(false);
  
  const onClick = useCallback(() => {
    setActive(true);
  }, []);
  
  const onAnimationEnd = useCallback(() => {
    console.log('end');
    setActive(false);
  }, []);
  
  return (
      <Button className={active ? 'active' : ''} onClick={onClick} onAnimationEnd={onAnimationEnd}>
        Click Me
      </Button>
  );
}

const vibrateAnimate = keyframes`
  from {
    transform: translateX(-15px);
  }
  
  to {
    transform: translateX(15px);
  }
`;

const Button = styled.button`
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
