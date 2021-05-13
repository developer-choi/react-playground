import React from 'react';
import Head from 'next/head';
import styled, {keyframes} from 'styled-components';

export default function LoadingTextPage() {
  
  return (
      <>
        <Head>
          <title>loading-text</title>
        </Head>
        <div>
          <LoadingTextExample/>
        </div>
      </>
  );
}

function LoadingTextExample() {
  
  return (
      <Wrap>
        <LoadingCharacter>L</LoadingCharacter>
        <LoadingCharacter delay={0.1}>o</LoadingCharacter>
        <LoadingCharacter delay={0.2}>a</LoadingCharacter>
        <LoadingCharacter delay={0.3}>d</LoadingCharacter>
        <LoadingCharacter delay={0.4}>i</LoadingCharacter>
        <LoadingCharacter delay={0.5}>n</LoadingCharacter>
        <LoadingCharacter delay={0.6}>g</LoadingCharacter>
        <LoadingCharacter delay={0.7}>.</LoadingCharacter>
      </Wrap>
  );
}

const SETTINGS = {
  moveTopHeight: 20
};

const Wrap = styled.div`
  margin: auto;
  display: flex;
`;

const moveTopAnimate = keyframes`
  0%, 40% {
    transform: translateY(0);
  }
  
  20% {
    transform: translateY(-${SETTINGS.moveTopHeight}px);
  }
`;

const LoadingCharacter = styled.span<{delay?: number}>`
  animation: ${moveTopAnimate} 1s ease-in-out infinite ${props => props.delay ?? 0}s;
  letter-spacing: 20px;
  font-size: 40px;
  font-weight: bold;
`;
