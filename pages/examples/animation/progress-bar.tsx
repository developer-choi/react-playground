import React, {ComponentProps, useEffect, useState} from 'react';
import Head from 'next/head';
import {usePrevious} from '../../../src/utils/custom-hooks/usePrevious';
import {theme} from '../../../src/utils/style/theme';
import styled, {keyframes} from 'styled-components';

export default function ProgressBarPage() {
  const [progress, setProgress] = useState(0.5);
  
  useEffect(() => {
    setInterval(() => {
      setProgress(prevState => prevState + (Math.random() > 0.5 ? Math.random() / 5 : -1 * Math.random() / 5));
    }, 4000);
  }, []);
  
  return (
      <>
        <Head>
          <title>progress-bar</title>
        </Head>
        <div>
          <ProgressBar progress={progress}/>
        </div>
      </>
  );
}

/** 목적
 * 처음에 렌더링이 됬을 때도 애니메이션이 보이도록 하는것이 목적.
 * 결과적으로 적용한것은 CSS animation이었음.
 */

export interface ProgressBarProp extends Omit<ComponentProps<'div'>, 'ref'> {
  progress: number;
}

export function ProgressBar({progress, ...rest}: ProgressBarProp) {
  
  const prevProgress = usePrevious(progress);
  
  return (
      <Wrap {...rest}>
        <AnimatedStick prevWidth={!prevProgress ? 0 :prevProgress * 100} nextWidth={progress * 100}/>
      </Wrap>
  );
}

const ACTIVE_COLOR = theme.main;
const INACTIVE_COLOR = 'lightgray';
const THICKNESS = 15;

const Wrap = styled.div`
  background-color: ${INACTIVE_COLOR};
  display: flex;
`;

const Stick = styled.div`
  background-color: ${ACTIVE_COLOR};
  height: ${THICKNESS}px;
`;

const barAnimate = function (prevWidth: number, nextWidth: number) {
  
  return keyframes`
    from {
      width: ${prevWidth}%;
    }
    
    to {
      width: ${nextWidth}%;
    }
  `;
}

const AnimatedStick = styled(Stick)<{prevWidth: number, nextWidth: number}>`
  animation: ${(props) => barAnimate(props.prevWidth, props.nextWidth)} 1.5s forwards;
`;

/**
 * 아래 두가지 방법들은, 최초 애니메이션해줘야하는게 두개이상 늘어날 경우 코드가 썩 좋지않게된다.
 * 물론 ProgressBar 컴포넌트에서는 문제가 없겠지만, 최초 애니메이션이 필요한 아예다른 컴포넌트의 경우에 말이다.
 */
function Legacy2ProgressBar({progress, second, ...rest}: ProgressBarProp & {second: number}) {
  
  const [progressValue, setProgressValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  
  useEffect(() => {
    setProgressValue(progress);
    
    //계속 effect에서 setState해줘야하는게 늘어난다.
    setSecondValue(second);
  }, [progress, second]);
  
  return (
      <Wrap {...rest}>
        <Stick className="bar" style={{width: `${progressValue * 100}%`}}/>
      </Wrap>
  );
}

function Legacy3ProgressBar({progress, second, ...rest}: ProgressBarProp & {second: number}) {
  
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    setActive(true);
  }, []);
  
  return (
      <Wrap {...rest}>
        <Stick className="bar" style={{width: `${active ? progress * 100 : 0}%`}}/>
        {/* 계속 렌더링할 때 밑에서 삼항연산자가 들어가야하는 구조가 된다. */}
        <Stick className="bar" style={{width: `${active ? second * 100 : 0}%`}}/>
      </Wrap>
  );
}
