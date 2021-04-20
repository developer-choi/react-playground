import React from 'react';
import styled from 'styled-components';

export interface HeaderProp {

}

export default function Header({...rest}: HeaderProp) {
  
  return (
      <Wrap {...rest}>
        <NaverText width={52} src="/images/naver-text-logo.png" alt="naver-text-logo"/>
        <MainDoor>
          <CafeName>react-library</CafeName>
          <img width="100%" src="/images/cafe-main-door.png" alt="cafe-main-door"/>
        </MainDoor>
      </Wrap>
  );
}

const Wrap = styled.header`
`;

const NaverText = styled.img`
  margin: 15px 0;
`;

const CafeName = styled.span`
  font-weight: bold;
  font-size: 30px;
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const MainDoor = styled.div`
  position: relative;
`;
