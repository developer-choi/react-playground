import React from 'react';
import styled from 'styled-components';
import NeonButton from './NeonButton';
import WrongButton from './WrongButton';
import RippleButton from './RippleButton';

export default function ButtonAnimationExample() {
  
  return (
      <Wrap>
        <NeonButton/>
        <WrongButton/>
        <RippleButton/>
      </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  
  > * {
    margin-right: 10px;
  }
`;
