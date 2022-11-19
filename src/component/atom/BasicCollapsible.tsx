import type {PropsWithChildren, ReactNode} from 'react';
import React, {useEffect, useRef, useState} from 'react';
import useToggle from '@util/custom-hooks/useToggle';
import styled from 'styled-components';
import useIsFirstRender from '@util/custom-hooks/useIsFirstRender';
import {myClassName} from '@util/libraries/classnames';

export interface BasicCollapsibleProp extends PropsWithChildren<{}> {
  children: ReactNode;
  initialCollapsed?: boolean;
  enableAnimation?: boolean;
}

export default function BasicCollapsible({children, initialCollapsed = true, enableAnimation = true}: BasicCollapsibleProp) {
  const {toggle, value: collapsed} = useToggle(initialCollapsed);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const isFirstRendering = useIsFirstRender();

  useEffect(() => {
    /**
     * 최초렌더링시 올바르게 높이측정이 가능하도록
     * conditional rendering으로 return null을 한다거나
     * 스타일 조정으로 숨긴다거나 하는일이 없어야 올바르게 측정가능.
     */
    setScrollHeight(contentRef.current?.scrollHeight as number);
  }, []);

  // if (isFirstRendering) {
  //   return null;
  // }

  return (
    <>
      <button onClick={toggle}>{collapsed ? '펼치기' : '접기'}</button>
      <Content ref={contentRef} style={{maxHeight: collapsed ? 0 : isFirstRendering ? undefined : scrollHeight}} className={myClassName({enableAnimation})}>
        {children}
      </Content>
    </>
  );
}

const Content = styled.div`
  overflow: hidden;
  
  &.enableAnimation {
    transition: max-height 0.4s ease-out;
  }
`;
