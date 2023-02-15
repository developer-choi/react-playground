import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export interface SomeSidebarProp {

}

export default function SomeSidebar({}: SomeSidebarProp) {
  return (
    <Wrap>
      <Nav>
        {LINKS.map(({name, href}) => (
          <Link key={name} href={href} passHref>
            <Anchor>{name}</Anchor>
          </Link>
        ))}
      </Nav>
    </Wrap>
  );
}

export const SIDEBAR_WIDTH = 200;

const Wrap = styled.aside`
  display: flex;
  flex-direction: column;
  width: ${SIDEBAR_WIDTH}px;
  background: ${props => props.theme.main};
  position: fixed;
  z-index: 10;
  height: 100%;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const Anchor = styled.a`
  padding: 10px;
`;

const upperPath = '/solution/layout/';

const LINKS: {name: string, href: string}[] = [
  {name: 'layout1', href: upperPath + 1},
  {name: 'layout2', href: upperPath + 2}
];
