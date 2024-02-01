import type {CSSProperties, MouseEvent, PropsWithChildren, ReactNode} from "react";
import React, {useCallback, useState} from "react";

export interface CollapsibleProp extends PropsWithChildren<{}> {
  children: ReactNode;
  renderHeader: (props: CollapsibleHeaderProp) => ReactNode;
  renderContent: (props: CollapsibleContentProp) => ReactNode;
  initialCollapsed?: boolean;
}

export default function Collapsible({children, renderHeader, renderContent, initialCollapsed = true}: CollapsibleProp) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const toggle = useCallback((event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setCollapsed((prevState) => !prevState);
  }, []);

  return (
    <>
      {renderHeader({collapsed, onClick: toggle})}
      {renderContent({children, collapsed, style: {overflow: "hidden", height: collapsed ? 0 : "auto"}})}
    </>
  );
}

export interface CollapsibleHeaderProp {
  onClick: (event: MouseEvent<HTMLElement>) => void;
  collapsed: boolean;
}

export interface CollapsibleContentProp {
  collapsed: boolean;
  children: ReactNode;
  style: CSSProperties;
}
