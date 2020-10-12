import React, {ComponentProps} from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import Circle from './Circle';

export interface DropDownItemType {
  name: string;
  to?: string;
  children?: Required<Omit<DropDownItemType, 'children'>>[];
}

export interface DropDownItemProp extends Omit<ComponentProps<'div'>, 'ref'> {
  item: DropDownItemType;
}

export default function DropDownItem({item, className, ...rest}: DropDownItemProp) {

  const wrapClassName = classNames({active: item.children !== undefined}, className);

  return (
      <Wrap className={wrapClassName} {...rest}>
        <TopWrap>
          Hover Me
        </TopWrap>
        <BottomWrap className="drop-down-bottom-wrap">
          <VirtualBox className="virtual-box"/>
          <InnerWrap>
            <Link to="/a"><Circle/>link1</Link>
            <Link to="/b"><Circle/>link2</Link>
            <Link to="/c"><Circle/>link3</Link>
          </InnerWrap>
        </BottomWrap>
      </Wrap>
  );
}

const MOVE_UP_HEIGHT = 10;

const Wrap = styled.div`
  position: relative;
  cursor: pointer;
  
  &.active:hover {
    .drop-down-bottom-wrap {
      opacity: 1;
    }
    .virtual-box {
      height: 0;
    }
  }
`;

const VirtualBox = styled.div`
  height: ${MOVE_UP_HEIGHT}px;
  transition: height, 0.5s;
`;

const TopWrap = styled.div`
  height: 100%;
  background-color: green;
  color: white;
  
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  padding: 0 20px;
`;

const BottomWrap = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  opacity: 0;
  transition: 0.2s;
  width: 100%;
  z-index: 100;
`;

const InnerWrap = styled.nav`
  background-color: yellow;
  color: white;
  display: flex;
  flex-direction: column;
`;
