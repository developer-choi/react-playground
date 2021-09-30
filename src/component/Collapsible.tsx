import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {usePrevious} from '@util/custom-hooks/usePrevious';

export interface CollapsibleProp extends PropsWithChildren<{}> {
  collapsed: boolean;
}

export default function Collapsible({collapsed, children}: CollapsibleProp) {

  const prevCollapsed = usePrevious(collapsed);
  const [height, setHeight] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const initialRender = prevCollapsed === undefined;

  useEffect(() => {

    if (prevCollapsed === true && !collapsed) {
      const contentHeight = innerRef.current?.clientHeight ?? 0;
      setHeight(contentHeight);

    } else if(prevCollapsed === false && collapsed) {
      setHeight(0);
    }

  }, [prevCollapsed, collapsed]);

  useEffect(() => {

    if (initialRender && !collapsed) {
      const contentHeight = innerRef.current?.clientHeight ?? 0;
      setTimeout(() => {
        setHeight(contentHeight);
      }, 100);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRender]);

  return (
      <Wrap style={{height}}>
        <Inner ref={innerRef}>
          {children}
        </Inner>
      </Wrap>
  );
}

const Wrap = styled.div`
  overflow: hidden;
  transition: height, 0.5s;
`;

const Inner = styled.div`

`;
