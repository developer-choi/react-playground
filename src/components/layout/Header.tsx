import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {

  return (
      <HeaderStyle>
        <ReactLink to="/">
          <ReactIcon src="/public/react-logo.png"/>
          <ReactText>React</ReactText>
        </ReactLink>
        <HeaderNavLink to="/doc">Doc</HeaderNavLink>
        <HeaderNavLink to="/api">Api</HeaderNavLink>
        <HeaderNavLink to="/component">Component</HeaderNavLink>
      </HeaderStyle>
  );
}

const ReactIcon = styled.img`
  width: 22px;
  margin-right: 10px;
`;

const ReactLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const ReactText = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: ${props => props.theme.colors.reactBlue};
`;

const HeaderNavLink = styled(NavLink)`
  font-size: 18px;
  color: white;
  
  &.active, &:hover {
    color: ${props => props.theme.colors.reactBlue};
  }
`;

const HeaderStyle = styled.header`
  height: 60px;
  background: ${props => props.theme.colors.black};
  padding-left: 30px;
  
  display: flex;
  align-items: center;
  flex-shrink: 0;
  
  > *:not(:last-child) {
      margin-right: 50px;
  }
`;
