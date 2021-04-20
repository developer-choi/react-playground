import React from 'react';
import styled from 'styled-components';

export interface AsideProp {

}

export default function Aside({...rest}: AsideProp) {
  
  return (
      <Wrap {...rest}/>
  );
}

const Wrap = styled.aside`
`;
