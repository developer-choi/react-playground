import React, {MouseEventHandler, ReactNode, useRef} from 'react';
import Head from 'next/head';
import styled from 'styled-components';

export default function CaptureAndBubblePage() {
  
  const bubbleTest = useRef([
    {square: 400, onClickHandler: () => console.log('4번째 외곽')},
    {square: 300, onClickHandler: () => console.log('3번째 외곽')},
    {square: 200, onClickHandler: () => console.log('2번째 외곽')},
    {square: 100, onClickHandler: () => console.log('1번째 외곽')}
  ]);
  
  const bubbleTest2 = useRef([
    {square: 400, onClickHandler: () => console.log('4번째 외곽'), capture: true},
    {square: 400, onClickHandler: () => console.log('3번째 외곽'), capture: true},
    {square: 400, onClickHandler: () => console.log('2번째 외곽'), capture: true},
    {square: 400, onClickHandler: () => console.log('1번째 외곽'), capture: true}
  ]);
  
  return (
      <>
        <Head>
          <title>capture-and-bubble</title>
        </Head>
        <div>
          <CaptureAndBubbleStyle>
            <OverlapSquare squareArray={bubbleTest.current}/>
            <OverlapSquare squareArray={bubbleTest2.current}/>
          </CaptureAndBubbleStyle>
        </div>
      </>
  );
};

const CaptureAndBubbleStyle = styled.div`
  
  > .Square-wrap {
    margin-bottom: 10px;
  }
`;

interface OverlapSquareProp {
  currentIndex?: number;
  squareArray: Array<{
    square: number,
    onClickHandler: MouseEventHandler<HTMLDivElement>
    capture?: boolean;
  }>;
}

function OverlapSquare({squareArray, currentIndex = 0}: OverlapSquareProp) {
  
  const currentSquare = squareArray[currentIndex];
  
  if (currentIndex < squareArray.length) {
    
    return (
        <Square square={currentSquare.square} isCenter={currentIndex > 0}
                onClickHandler={currentSquare.onClickHandler} capture={!!currentSquare.capture}>
          <OverlapSquare currentIndex={currentIndex + 1} squareArray={squareArray}/>
        </Square>
    );
    
  } else {
    return null;
  }
}

interface SquareProp {
  square: number;
  onClickHandler?: MouseEventHandler<HTMLDivElement>
  capture: boolean;
  children?: ReactNode;
  isCenter?: boolean;
}

function Square(props: SquareProp) {
  
  const cursor = props.onClickHandler ? 'pointer' : 'auto';
  const center = props.isCenter ? 'center' : '';
  const style = {width: `${props.square}px`, height: `${props.square}px`, cursor: cursor};
  
  const onCLick = props.capture ? undefined : props.onClickHandler;
  const onCLickCapture = props.capture ? props.onClickHandler : undefined;
  
  return (
      <SquareStyle className={`${center}`} onClickCapture={onCLickCapture} onClick={onCLick} style={style}>
        {props.children}
      </SquareStyle>
  );
}

const SquareStyle = styled.div`
  display: flex;
  cursor: pointer;
  border: 1px solid gray;
  
  &.center {
    margin: auto;
  }
`;
