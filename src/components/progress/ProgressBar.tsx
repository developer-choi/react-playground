import React, {DivProp, useEffect, useState} from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import {theme} from '../../utils/style/theme';

export interface ProgressBarProp extends DivProp {
  progress: number;
}

export default function ProgressBar({className, progress, ...rest}: ProgressBarProp) {

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  const wrapClass = classNames({active}, className);

  /**
   * active stick, inactive stick 2개를 놓고 transform으로 active stick을 옮기는 방식보다는,
   *
   * 1. inactive stick의 백그라운드는 기본 Wrapper에 background를 줘서 해결하고,
   * 2. active stick하나의 width만 키워서 progress를 보여주는 방식이 나으며,
   *
   * 최초 렌더링시에도 애니메이션을 주기 위해서 가장 좋은 방법은
   * boolean state 하나 선언하고 최초 useEffect에서만 setState를 하여
   * 이거 하나로 애니메이션을 조절하는 것이다.
   *
   * 하지만 이것도 문제가있는데, 밑에 Legacy2 ProgressBar 컴포넌트에 작성했다.
   */

  return (
      // <Wrap {...rest}>
      //   <InactiveStick color={INACTIVE_COLOR}/>
      //   <ActiveStick className={classNames({active: initialRender})} rate={rate} color={activeColor}/>
      // </Wrap>
      <Wrap className={wrapClass} {...rest}>
        <Stick className="bar" style={{width: `${active ? progress * 100 : 0}%`}}/>
      </Wrap>
  );
}

const ACTIVE_COLOR = theme.main;
const INACTIVE_COLOR = 'lightgray';
const THICKNESS = 15;

const Wrap = styled.div`
  background-color: ${INACTIVE_COLOR};
`;

const Stick = styled.div`
  background-color: ${ACTIVE_COLOR};
  height: ${THICKNESS}px;
`;

/**
 * 아래 두가지 방법들은, 최초 애니메이션해줘야하는게 두개이상 늘어날 경우 코드가 썩 좋지않게된다.
 * 물론 ProgressBar 컴포넌트에서는 문제가 없겠지만, 최초 애니메이션이 필요한 아예다른 컴포넌트의 경우에 말이다.
 */
function Legacy1ProgressBar({progress, second, ...rest}: ProgressBarProp & {second: number}) {

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

function Legacy2ProgressBar({progress, second, ...rest}: ProgressBarProp & {second: number}) {

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
