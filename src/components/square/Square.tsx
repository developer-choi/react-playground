import React, {MouseEventHandler, ReactNode} from 'react';
import styled from 'styled-components';

interface AppProp {
  square: number;
  onClickHandler?: MouseEventHandler<HTMLDivElement>
  capture: boolean;
  children?: ReactNode;
  isCenter?: boolean;
}

export default function Square(props: AppProp) {

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
