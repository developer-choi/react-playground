import React, {useCallback, useRef} from 'react';
import Button from '@component/atom/button/Button';
import styled from 'styled-components';

export default function FullscreenPage() {
  const boxRef = useRef<HTMLDivElement>(null);
  
  const requestFullscreen = useCallback(async () => {
    if (!boxRef.current) {
      return;
    }
    const boxElement = boxRef.current;
    await boxElement.requestFullscreen();
    console.log(document.fullscreenElement === boxElement);
  }, []);
  
  return (
      <Wrap>
        <Button onClick={requestFullscreen}>박스를 풀스크린으로 만들기</Button>
        <Box ref={boxRef}/>
      </Wrap>
  );
}

const Wrap = styled.div`

`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background: red;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
