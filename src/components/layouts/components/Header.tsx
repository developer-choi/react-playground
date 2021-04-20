import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export interface HeaderProp {

}

export default function Header({...rest}: HeaderProp) {
  
  return (
      <Wrap {...rest}>
        <Link href="/">
          <a>
            <NaverText width={52} src="/images/naver-text-logo.png" alt="naver-text-logo"/>
            <MainDoor>
              <TextWrap>
                <CafeName>react-library</CafeName>
                <CafeUrl>https://react-library-eta.vercel.app/</CafeUrl>
              </TextWrap>
              <img width="100%" src="/images/cafe-main-door.png" alt="cafe-main-door"/>
            </MainDoor>
          </a>
        </Link>
      </Wrap>
  );
}

const Wrap = styled.header`
`;

const NaverText = styled.img`
  margin: 15px 0;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 24px;
  left: 24px;
`;

const CafeName = styled.span`
  font-weight: bold;
  font-size: 40px;
`;

const MainDoor = styled.div`
  position: relative;
`;

const CafeUrl = styled.span`
  color: #666;
  margin-top: 10px;
`;
