import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
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
