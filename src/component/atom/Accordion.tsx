import type {CSSProperties, ForwardRefExoticComponent, PropsWithoutRef, ReactNode, Ref, RefAttributes} from 'react';
import React, {useEffect, useRef, useState} from 'react';
import useIsFirstRender from '@util/custom-hooks/useIsFirstRender';

export interface AccordionProp {
  children: ReactNode;
  renderHeader: (props: AccordionHeaderProp) => JSX.Element;
  renderContent: ForwardRefExoticComponent<PropsWithoutRef<AccordionContentProp> & RefAttributes<any>>;
  onChange: (collapsed: boolean) => void;
  collapsed: boolean;
}

/**
 * Limitations 중첩되게 못씀.
 */
export default function Accordion({children, onChange, collapsed, renderHeader: Header, renderContent: Content}: AccordionProp) {
  const [scrollHeight, setScrollHeight] = useState(0);
  const contentRef = useRef<any>(null);
  const isFirstRendering = useIsFirstRender();

  useEffect(() => {
    setScrollHeight(contentRef.current?.scrollHeight as number);
  }, []);

  const contentDefaultStyle = {
    overflow: 'hidden',
    transition: 'max-height 0.4s ease-out'
  };

  const contentCollapsedStyle = {
    maxHeight: collapsed ? 0 : isFirstRendering ? undefined : scrollHeight
  };

  return (
    <>
      <Header collapsed={collapsed} onClick={() => onChange(!collapsed)}/>
      <Content ref={contentRef} style={{...contentDefaultStyle, ...contentCollapsedStyle}}>
        {children}
      </Content>
    </>
  );
}

export interface AccordionHeaderProp {
  onClick: () => void;
  collapsed: boolean;
}

export interface AccordionContentProp {
  ref: Ref<any>;
  style: CSSProperties;
  children: ReactNode;
}
