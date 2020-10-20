import React, {useRef} from 'react';
import OverlapSquare from '../../components/square/OverlapSquare';
import styled from 'styled-components';

export default function CaptureAndBubble() {

  const bubbleTest = useRef(
      [
        {square: 400, onClickHandler: () => console.log('4번째 외곽')},
        {square: 300, onClickHandler: () => console.log('3번째 외곽')},
        {square: 200, onClickHandler: () => console.log('2번째 외곽')},
        {square: 100, onClickHandler: () => console.log('1번째 외곽')}
      ]
  );

  const bubbleTest2 = useRef(
      [
        {square: 400, onClickHandler: () => console.log('4번째 외곽'), capture: true},
        {square: 400, onClickHandler: () => console.log('3번째 외곽'), capture: true},
        {square: 400, onClickHandler: () => console.log('2번째 외곽'), capture: true},
        {square: 400, onClickHandler: () => console.log('1번째 외곽'), capture: true}
      ]
  );

  return (
      <CaptureAndBubbleStyle>
        <OverlapSquare squareArray={bubbleTest.current}/>
        <OverlapSquare squareArray={bubbleTest2.current}/>
      </CaptureAndBubbleStyle>
  );
}

const CaptureAndBubbleStyle = styled.div`

  > .Square-wrap {
      margin-bottom: 10px;
  }
`;
