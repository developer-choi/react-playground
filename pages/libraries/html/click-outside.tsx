import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useClickOutside} from '@util/extend/event/event';

// http://localhost:3000/libraries/html/click-outside
export default function Page() {
  const wrapperRef = useClickOutside<HTMLDivElement>();

  const onClick = useCallback(() => {
    alert('You clicked inside.');
  }, []);

  return (
    <Box ref={wrapperRef} onClick={onClick}>
      CLICK ME
    </Box>
  );
}

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;
