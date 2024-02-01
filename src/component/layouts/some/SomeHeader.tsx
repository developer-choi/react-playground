import React from "react";
import styled from "styled-components";
import {useAppSelector} from "@store/hooks";
import {shallowEqual} from "react-redux";
import {SIDEBAR_WIDTH} from "@component/layouts/some/SomeSidebar";

export default function SomeHeader() {
  const {title, onClickHeader, backgroundColor, height} = useAppSelector((state) => state.layout.headerProp, shallowEqual);

  return (
    <Wrap onClick={onClickHeader} style={{cursor: onClickHeader ? "pointer" : "auto", backgroundColor, height}}>
      {title}
    </Wrap>
  );
}

export const HEADER_HEIGHT = 50;

const Wrap = styled.header`
  height: ${HEADER_HEIGHT}px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: lavender;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  padding-left: ${SIDEBAR_WIDTH + 10}px;
`;
