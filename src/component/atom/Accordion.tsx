import type {CSSProperties, ForwardRefExoticComponent, PropsWithoutRef, ReactNode, RefAttributes} from "react";
import React, {useEffect, useRef, useState} from "react";
import {useIsFirstRender} from "@util/extend/react";

export interface AccordionProp<T> {
  children: ReactNode;
  renderHeader: (props: AccordionHeaderProp<T>) => JSX.Element;
  renderContent: ForwardRefExoticComponent<PropsWithoutRef<AccordionContentProp<T>> & RefAttributes<any>>;
  onChange: (collapsed: boolean) => void;
  collapsed: boolean;
  additionalProps?: T;
  dependencyContent?: any;
}

/**
 * Limitations 중첩되게 못씀.
 */
export default function Accordion<T>({children, onChange, collapsed, renderHeader: Header, renderContent: Content, additionalProps, dependencyContent}: AccordionProp<T>) {
  const [scrollHeight, setScrollHeight] = useState(0);
  const contentRef = useRef<any>(null);
  const isFirstRendering = useIsFirstRender();

  useEffect(() => {
    setScrollHeight(contentRef.current?.scrollHeight as number);
  }, [dependencyContent]);

  const contentDefaultStyle = {
    overflow: "hidden",
    transition: "max-height 0.4s ease-out"
  };

  const contentCollapsedStyle = {
    maxHeight: collapsed ? 0 : isFirstRendering ? undefined : scrollHeight
  };

  return (
    <>
      <Header collapsed={collapsed} onClick={() => onChange(!collapsed)} additionalProps={additionalProps ?? {}} />
      <Content ref={contentRef} style={{...contentDefaultStyle, ...contentCollapsedStyle}} additionalProps={additionalProps ?? {}}>
        {children}
      </Content>
    </>
  );
}

export interface AccordionHeaderProp<T = undefined> {
  onClick: () => void;
  collapsed: boolean;
  additionalProps: Partial<T>;
}

export interface AccordionContentProp<T = undefined> {
  style: CSSProperties;
  children: ReactNode;
  additionalProps: Partial<T>;
}
