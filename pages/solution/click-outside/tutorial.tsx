import React from 'react';
import styled from 'styled-components';
import {useClickOutside} from '@util/extend/event/event';

// http://localhost:3000/solution/click-outside/tutorial
export default function Page() {
  const {wrapperRef} = useClickOutside<HTMLDivElement>({
    callback: () => {
      alert('Click outside');
    }
  });

  return (
    <Box ref={wrapperRef}>
      Try click outside
    </Box>
  );
}

const Box = styled.div`
  display: inline-flex;
  padding: 20px;
  background-color: red;
  color: white;
  
  align-items: center;
  justify-content: center;
`;
