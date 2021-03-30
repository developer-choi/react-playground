import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import styled from 'styled-components';
import {HEIGHTS, ZINDEXS} from '../../utils/style/layout';
import {FIRST_DIR} from '../../utils/route';
import reactLogo from '../../../public/react-logo.png';
import {COLORS} from '../../utils/style/theme';

export default function Header() {

  return (
      <HeaderStyle>
        <InnerWrap>
          <LeftWrap>
            <LogoWrap to="/">
              <ReactIcon src={reactLogo}/>
              <ReactText>React</ReactText>
            </LogoWrap>
            <PageLink to="/doc">문서</PageLink>
            <PageLink to={FIRST_DIR.style}>스타일</PageLink>
          </LeftWrap>
          <RightWrap>
            <RightLink target="_black" href="https://github.com/developer-choi/react-library">Github</RightLink>
          </RightWrap>
        </InnerWrap>
      </HeaderStyle>
  );
}

const ReactIcon = styled.img`
  width: 22px;
  margin-right: 10px;
`;

const LogoWrap = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 110px;
`;

const ReactText = styled.span`
  font-weight: bold;
  font-size: 20px;
  color: ${COLORS.reactBlue};
`;

const PageLink = styled(NavLink)`
  font-size: 18px;
  color: white;
  padding: 0 20px;
`;

const HeaderStyle = styled.header`
  height: ${HEIGHTS.header}px;
  background: ${props => props.theme.headerBack1};
  position: fixed;
  width: 100%;
  z-index: ${ZINDEXS.header};
`;

const InnerWrap = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  
  display: flex;
  justify-content: space-between;
  
  a {
    transition: 0.5s;
    &.active, &:hover {
      color: ${COLORS.reactBlue};
    }
  }
`;

const LeftWrap = styled.div`
  display: flex;
  align-items: center;
`;

const RightWrap = styled.div`
  display: flex;
  align-items: center;
`;

const RightLink = styled.a`
  font-size: 14px;
  color: white;
`;
