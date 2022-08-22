import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export interface SomeSidebarProp {

}

export default function SomeSidebar({}: SomeSidebarProp) {
  const [openedTitle, setOpenedTitle] = useState('');

  const toggleCollapse = useCallback((title: string) => {
    setOpenedTitle(prevState => prevState !== title ? title : '');
  }, []);

  return (
    <Wrap>
      {allLinks.map(({links, title}) => (
        <Item key={title} title={title} links={links} isOpen={title === openedTitle} onClick={toggleCollapse}/>
      ))}
    </Wrap>
  );
}

const Wrap = styled.aside`
  display: flex;
  flex-direction: column;
  width: 200px;
  background: ${props => props.theme.main};
`;

interface ItemProp {
  title: string;
  links: {name: string, href: string}[];
  isOpen: boolean;
  onClick: (title: string) => void;
}

function Item({links, title, isOpen, onClick}: ItemProp) {
  const navRef = useRef<HTMLInputElement>(null);

  const _onClick = useCallback(() => {
    onClick(title);
  }, [onClick, title]);

  const style = !isOpen ? undefined : {
    maxHeight: navRef.current?.scrollHeight ?? 0
  };
  
  return (
    <>
      <CollapseButton onClick={_onClick}>{title}</CollapseButton>
      <Nav ref={navRef} style={style}>
        {links.map(({name, href}) => (
          <Link key={name} href={href} passHref>
            <Anchor>{name}</Anchor>
          </Link>
        ))}
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  transition: max-height 0.2s ease-out;
  max-height: 0;
  overflow: hidden;
`;

const Anchor = styled.a`
  padding: 10px;
`;

const CollapseButton = styled.button`
  padding: 10px;
`;

const upperPath = '/examples/layout/layout';

const links1: ItemProp['links'] = [
  {name: 'layout1', href: upperPath + 1},
  {name: 'layout2', href: upperPath + 2}
];

const links2: ItemProp['links'] = [
  {name: 'layout3', href: upperPath + 3},
  {name: 'layout4', href: upperPath + 4}
];

const allLinks: {title: string, links: ItemProp['links']}[] = [
  {title: '레이아웃 적용', links: links1},
  {title: '레이아웃 미적용', links: links2}
];
