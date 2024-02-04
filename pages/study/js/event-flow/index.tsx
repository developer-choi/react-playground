import React, {useCallback, MouseEvent} from 'react';
import Button from '@component/atom/element/Button';
import styled from 'styled-components';
import {flexCenter} from '@util/services/style/css';

// URL: http://localhost:3000/study/js/event-flow
export default function Page() {
  const clickHandler = useCallback((name: string) => {
    return (event: MouseEvent) => {
      console.log(name, event.eventPhase, event.nativeEvent.eventPhase);
    };
  }, []);


  const wrap1Bubble = clickHandler('wrap1Bubble');
  const wrap1Capture = clickHandler('wrap1Capture');
  const wrap2Bubble = clickHandler('wrap2Bubble');
  const wrap2Capture = clickHandler('wrap2Capture');
  const buttonBubble = clickHandler('buttonBubble');
  const buttonCapture = clickHandler('buttonCapture');

  /**
   * [Expected] (event-flow.html처럼)
   *
   * wrap1 capture / eventPhase 1
   * wrap2 capture / eventPhase 1
   * button capture / eventPhase 2
   * button bubble / eventPhase 2
   * wrap1 bubble / eventPhase 3
   * wrap2 bubble / eventPhase 3
   *
   * [Result]
   *
   * wrap1 capture / eventPhase 1
   * wrap2 capture / eventPhase 1
   * button capture / eventPhase 1
   * button bubble / eventPhase 3
   * wrap1 bubble / eventPhase 3
   * wrap2 bubble / eventPhase 3
   */

  return (
    <Wrap1 onClick={wrap1Bubble} onClickCapture={wrap1Capture}>
      <Wrap2 onClick={wrap2Bubble} onClickCapture={wrap2Capture}>
        <Button onClick={buttonBubble} onClickCapture={buttonCapture}>Click Me</Button>
      </Wrap2>
    </Wrap1>
  );
}

const Wrap1 = styled.div`
  width: 300px;
  height: 300px;
  background-color: red;
  ${flexCenter};
`;

const Wrap2 = styled.div`
  width: 200px;
  height: 200px;
  background-color: blue;
  ${flexCenter};
`;