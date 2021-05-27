import React, {useCallback} from 'react';
import Head from 'next/head';
import {Button} from '@components/atom/button/button-presets';
import styled from 'styled-components';
import {absoluteAll0} from '../../../src/utils/style/css';

export default function StackingContextPage() {
  const onClickStackButton = useCallback(() => {
    alert('Stack button clicked');
  }, []);
  
  const onClickAbsoluteButton = useCallback(() => {
    alert('Absolute button clicked');
  }, []);
  
  return (
      <>
        <Head>
          <title>stacking-context</title>
        </Head>
        <Wrap>
          <GridWrap>
            <GridItem>
              <StackDiv>
                <Button onClick={onClickStackButton}>Stack Button</Button>
              </StackDiv>
              
              <AbsoluteDiv>
                <Button style={{marginLeft: 100}} onClick={onClickAbsoluteButton}>Absolute Button</Button>
              </AbsoluteDiv>
            </GridItem>
            <GridItem/>
            <GridItem/>
            <GridItem/>
          </GridWrap>
        </Wrap>
      </>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const GridWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;

const GridItem = styled.div`
  position: relative;
  border: 1px solid black;
`;

const StackDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const AbsoluteDiv = styled.div`
  ${absoluteAll0};
`;
