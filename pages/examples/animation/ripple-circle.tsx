import React from 'react';
import Head from 'next/head';
import styled, {keyframes} from 'styled-components';

export default function RippleCirclePage() {
  
  return (
      <>
        <Head>
          <title>ripple-circle</title>
        </Head>
        <Wrap>
          <RippleCircle/>
          <RippleCircle animationDelay={0.5}/>
          <RippleCircle animationDelay={1}/>
          <RippleCircle animationDelay={1.5}/>
          <RippleCircle animationDelay={2}/>
          <RippleCircle animationDelay={2.5}/>
          <RippleCircle animationDelay={3}/>
          <RippleCircle animationDelay={3.5}/>
          <RippleCircle animationDelay={4}/>
          <RippleCircle animationDelay={4.5}/>
          <RippleCircle animationDelay={5}/>
        </Wrap>
      </>
  );
}

const Wrap = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 500px;
  height: 500px;
  border-radius: 50%;
`;

const rippleAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
  }
  
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
`;

function RippleCircle({animationDelay = 0}: { animationDelay?: number }) {
  return <StyledRippleCircle style={{animationDelay: `${animationDelay}s`}}/>
}

const StyledRippleCircle = styled.div`
  opacity: 0.5;
  position: absolute;
  border-radius: 50%;
  animation: ${rippleAnimation} 3s infinite linear;
  background-color: green;
`;
