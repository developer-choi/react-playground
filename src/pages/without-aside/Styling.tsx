import React from 'react';
import styled from 'styled-components';

export default function Styling() {

  return (
      <StylingStyle>
        <div style={{backgroundColor: 'red'}}>Hello World</div>
      </StylingStyle>
  );
}

const StylingStyle = styled.div`
  background-color: green;
`;
