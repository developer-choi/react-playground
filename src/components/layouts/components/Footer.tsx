import React from 'react';
import styled from 'styled-components';

export interface FooterProp {

}

export default function Footer({...rest}: FooterProp) {
  
  return (
      <Wrap {...rest}/>
  );
}

const Wrap = styled.footer`
`;
