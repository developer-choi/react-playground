import React, {useCallback, useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {LOREM_IPSUM} from '../../utils/dummy';
import Span from '../../components/basic/Span';

export default function AnimationExample1() {

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
        <MouseOverMe>Mouse Over Me</MouseOverMe>
        <DelayMouseOverMe>Mouse Over Me (Delay 0.5s)</DelayMouseOverMe>
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

const MouseOverMe = styled.div`
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

const DelayMouseOverMe = styled(MouseOverMe)`
  transition-delay: 0.5s;
`;

const rotate = keyframes`

  0%, 100% {
    background-color: white;
    //transform 대신에 left, top으로 할 수도 있긴한데 일일히 0 안써주면 뚝뚝 끊기게 이상하게 나오더라. 왜그러지?
    top: 0;  
    left: 0;
    border-radius: 50% 50% 50% 50%;  
  }
  
  25% {
    background-color: green;
    top: 0;
    left: 100px;  
    border-radius: 50% 0 0 0;
  }
  
  50% {
    background-color: red;
    top: 100px;
    left: 100px;
    border-radius: 50% 50% 0 0;
  }
  
  75% {
    background-color: lightcoral;
    top: 100px;
    left: 0;
    border-radius: 50% 50% 50% 0;  
  }
`;

const RotateMove = styled.div`
  
  width: 100px;
  height: 100px;
  display: block;  
  animation: ${rotate} 2s infinite;
  margin: 20px auto 0 auto;
  position: relative;
`;
