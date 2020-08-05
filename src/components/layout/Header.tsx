import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const ReactLogo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K`;

export default function Header() {

  return (
      <HeaderStyle>
        <ReactLink href="/">
          <ReactIcon src={ReactLogo}/>
          <ReactText>React</ReactText>
        </ReactLink>
        <HeaderNavLink to="/doc">Doc</HeaderNavLink>
        <HeaderNavLink to="/api">Api</HeaderNavLink>
      </HeaderStyle>
  );
}

const ReactIcon = styled.img`
  width: 22px;
  height: 20px;
  margin-right: 10px;
`;

const ReactLink = styled.a`
  display: flex;
  align-items: center;
`;

const ReactText = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: rgb(97, 218, 251);
`;

const HeaderNavLink = styled(NavLink)`
  font-size: 18px;
  color: white;
  
  &.active, &:hover {
    color: rgb(97, 218, 251);
  }
`;

const HeaderStyle = styled.header`
  height: 60px;
  background: #20232a;
  padding-left: 30px;
  
  display: flex;
  align-items: center;
  
  > *:not(:last-child) {
      margin-right: 50px;
  }
`;
