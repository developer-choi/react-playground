import React, {DragEvent} from 'react';
import styled from 'styled-components';
import {flexCenter} from '../src/utils/style/css';

export default function Page() {
  
  const [dragging, setDragging] = React.useState(false);
  
  const onDrop = React.useCallback((event: DragEvent<HTMLDivElement>) => {
    console.log('onDrop', event.dataTransfer.files);
    event.preventDefault(); // 이거 해야 onDrop 가능
    setDragging(false);
  }, []);
  
  const onDragLeave = React.useCallback(() => {
    console.log('onDragLeave');
    setDragging(false);
  }, []);
  
  const onDragEnter = React.useCallback(() => {
    console.log('onDragEnter');
    setDragging(true);
  }, []);
  
  const onDragOver = React.useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 이거 해야 onDrop 가능
  }, []);
  
  return (
      <Wrap className={dragging ? 'dragging' : ''} onDrop={onDrop} onDragLeave={onDragLeave} onDragEnter={onDragEnter} onDragOver={onDragOver}>
        <Message>Drag Here</Message>
      </Wrap>
  );
}

const Wrap = styled.div`
  width: 300px;
  height: 300px;
  border: 3px solid black;
  
  ${flexCenter};
  
  &.dragging {
    border: 3px dashed red;
  }
  
  //이거 안하면 자식위를 드래그한상태로 마우스 커서가 지나갈 때 onDragLeave event가 발생함.
  * {
    pointer-events: none;
  }
`;

const Message = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
