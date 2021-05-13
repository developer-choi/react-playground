import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import NeonButton from '@components/atom/button/NeonButton';
import WrongButton from '@components/atom/button/WrongButton';
import RippleButton from '@components/atom/button/RippleButton';

export default function ButtonsPage() {
  
  return (
      <>
        <Head>
          <title>buttons</title>
        </Head>
        <Wrap>
          <NeonButton/>
          <WrongButton/>
          <RippleButton/>
        </Wrap>
      </>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  
  > * {
    margin-right: 10px;
  }
`;
