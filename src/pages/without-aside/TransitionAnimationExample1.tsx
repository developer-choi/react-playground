import React, {useCallback, useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {LOREM_IPSUM} from '../../utils/dummy';
import Span from '../../components/basic/Span';

export default function TransitionAnimationExample1() {

  const [start, setStart] = useState(false);

  const onClick = useCallback(() => {
    console.log('onClick');
    setStart(prevState => !prevState);
  }, []);

  useEffect(() => {
    setStart(true);
  }, []);

  return (
      <Wrap>
        <Title style={start ? {transform: 'translateY(0)'} : {}} numberOfLines={2}>{LOREM_IPSUM}</Title>
        <Content style={start ? {transform: 'translateX(0)'} : {}}>{LOREM_IPSUM}</Content>
        <ToggleButton onClick={onClick} type="button">Toggle</ToggleButton>

        <RotateCircle>Mouse Over Me</RotateCircle>

        <RotateMove/>
      </Wrap>
  );
}

const Wrap = styled.div`
  background-color: lightblue;
  min-height: 100%;
  padding: 20px;
`;

const Title = styled(Span)`
  color: white;
  font-weight: bold;
  transition: transform 1s;
  transform: translateY(-500px);
`;

const Content = styled.span`
  display: block;
  color: white;
  margin-top: 20px;
  transition: transform 1s;
  transform: translateX(-1000px);
`;

const ToggleButton = styled.button`
  
  border: 1px solid darkblue;
  padding: 10px 25px;
  
  //MARGIN_AUTO -- 여기서 display block을 안하면 margin 0 auto가 적용이 안된다?
  margin: 20px auto 0 auto;
  display: block;
  
  font-size: 18px;
`;

const RotateCircle = styled.div`
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  
  border: 1px solid darkblue;
  width: 150px;
  height: 150px;
  transition: all, 1s;
  
  &:hover {
    transform: rotateY(180deg);
    background-color: red;
    border-radius: 50%;
  }
`;

const rotate = keyframes`

  0%, 100% {
    background-color: white;  
  }
  
  25% {
    background-color: green;  
    transform: translateX(100px);
  }
  
  50% {
    background-color: red;
    transform: translateX(100px) translateY(100px);
  }
  
  75% {
    background-color: lightcoral;
    transform: translateY(100px);  
  }
`;

const RotateMove = styled.div`
  
  width: 100px;
  height: 100px;
  display: block;  
  animation: ${rotate} 4s infinite;
  margin: 20px auto 0 auto;
`;
