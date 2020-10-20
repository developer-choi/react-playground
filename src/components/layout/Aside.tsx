import React, { Fragment } from 'react';
import {NavLink, useRouteMatch} from 'react-router-dom';
import styled from 'styled-components';
import {HEIGHT} from '../../utils/style/layout';
import {ASIDE_LINKS} from '../../utils/route';
import {FlexDirectionColumn} from '../../utils/style/css';

export default function Aside() {

  const match = useRouteMatch<{ name: string }>('/:name');

  if (match === null) {
    return null;
  }

  const link = ASIDE_LINKS[match.params.name];

  if (link === undefined) {
    return null;
  }

  return (
      <AsideStyle>
        <Nav>
          {link.map(({childrens, name}, parentIndex) => (
              <Fragment key={`parent-${parentIndex}`}>
                <Parent>{name}</Parent>
                <ChildLinkWrap>
                  {childrens.map((child, childIndex) => (
                      <ChildLink key={`child-link-${childIndex}`} to={child.to}>{child.name}</ChildLink>
                  ))}
                </ChildLinkWrap>
              </Fragment>
          ))}
        </Nav>
      </AsideStyle>
  );
}

const AsideStyle = styled.aside`
  position: fixed;
  right: 0;
  top: ${HEIGHT.header}px;
  bottom: 0;
  background-color: ${props => props.theme.asideBack};
  
  width: 350px;
  flex-shrink: 0;
  padding: ${HEIGHT.headerDiffSection}px 40px;
`;

const Nav = styled.nav`
  color: ${props => props.theme.asideText};
  
  a:visited {
    color: ${props => props.theme.asideText};
  }
  a:hover {
    opacity: 0.7;
  }
`;

const Parent = styled.span`
  font-size: 16px;
`;

const ChildLink = styled(NavLink)`
  font-size: 14px;
  padding-left: 10px;
  border-left: 3px solid ${props => props.theme.asideBack};;
  
  &.active {
    border-color: ${props => props.theme.main};
    font-weight: bold;
  }
`;

const ChildLinkWrap = styled(FlexDirectionColumn)`
  margin-top: 10px;
`;
