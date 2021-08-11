import React, {useCallback} from 'react';
import Head from 'next/head';
import {Button} from '@components/atom/button/button-presets';
import styled from 'styled-components';
import {absoluteAllZero} from '../../../src/utils/style/css';

export default function StackingContextPage() {
  const onClickStaticButton = useCallback(() => {
    alert('Stack button clicked');
  }, []);
  
  const onClickAbsoluteButton = useCallback(() => {
    alert('Absolute button clicked');
  }, []);
  
  const onClickRelativeButton = useCallback(() => {
    alert('Absolute button clicked');
  }, []);
  
  //https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
  
  return (
      <>
        <Head>
          <title>stacking-context</title>
        </Head>
        <Wrap>
          <GridWrap>
            {/* Case1. static이 absolute 보다 나중에 오더라도, static의 zIndex값이 아무리높아도 z-index싸움에서 진다. 왜냐하면 static은 stacking context가 생기지않기때문이다. static에 zIndex값은 적용이안된다.*/}
            <GridItem>
              <AbsoluteDiv>
                <Button style={{marginLeft: 150}} onClick={onClickAbsoluteButton}>Absolute Button</Button>
              </AbsoluteDiv>
              <StaticDiv style={{zIndex: 999}}>
                <Button onClick={onClickStaticButton}>Static Button</Button>
              </StaticDiv>
            </GridItem>
  
            {/* Case2. static이 아니면 이제부터 z-index경쟁을 시작하는데 (= stacking context가 생성되는데) 나중에 온 relative가 absolute를 이긴다.*/}
            <GridItem>
              <AbsoluteDiv>
                <Button style={{marginLeft: 150}} onClick={onClickAbsoluteButton}>Absolute Button</Button>
              </AbsoluteDiv>
              <RelativeDiv>
                <Button onClick={onClickRelativeButton}>Relative Button</Button>
              </RelativeDiv>
            </GridItem>
  
            {/* Case3. 그래서 형제관계는 나중에 오더라도 z-index가 높은쪽이 이긴다.*/}
            <GridItem>
              <AbsoluteDiv style={{zIndex: 999}}>
                <Button style={{marginLeft: 150}} onClick={onClickAbsoluteButton}>Absolute Button</Button>
              </AbsoluteDiv>
              <RelativeDiv>
                <Button onClick={onClickRelativeButton}>Relative Button</Button>
              </RelativeDiv>
            </GridItem>
  
            {/* Case4. 부모끼리 zIndex값이 차이가 나서 진 경우에는 자식의 zIndex가 아무리높아도 소용이없다.*/}
            <GridItem>
              <AbsoluteDiv style={{zIndex: 1}}>
                <Button style={{marginLeft: 150}} onClick={onClickAbsoluteButton}>Absolute Button</Button>
              </AbsoluteDiv>
              <RelativeDiv>
                <Button style={{zIndex: 999}} onClick={onClickRelativeButton}>Relative Button</Button>
              </RelativeDiv>
            </GridItem>
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

const StaticDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const AbsoluteDiv = styled.div`
  ${absoluteAllZero};
`;

const RelativeDiv = styled(StaticDiv)`
  position: relative;
`;
