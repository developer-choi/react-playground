import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export default function Aside() {
  
  return (
      <Wrap>
        <LinksWrap>
          {LINKS.map(({name, path}) => (
              <Link key={path} href={path}>
                <BoardAnchor>
                  <BoardIcon src="/images/naver-board-icon.png"/>
                  {name}
                </BoardAnchor>
              </Link>
          ))}
        </LinksWrap>
      </Wrap>
  );
}

const LINKS: { path: string, name: string; }[] = [
  {path: '/examples/multi-input-focus', name: 'multi input focus'},
  {path: '/examples/use-router/basic-use-router', name: 'basic-use-router'},
  {path: '/examples/use-router/param/hello-param', name: 'use-router-with-param'},
  {path: '/examples/use-router/catch-all/p1/p2/p3', name: 'catch-all-params'},
  {path: '/examples/use-router/catch-all-optional/p1/p2/p3', name: 'catch-all-optional-params'},
];

const Wrap = styled.aside`
  width: 200px;
  margin-right: 15px;
  border-top: 2px solid black;
  flex-shrink: 0;
`;

const LinksWrap = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
`;

const BoardAnchor = styled.a`
  margin: 6px 0;
  
  :hover {
    text-decoration: underline;
  }
`;

const BoardIcon = styled.img`
  margin-right: 7px;
`;
