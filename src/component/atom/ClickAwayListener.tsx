import React, {ReactNode, useCallback, useEffect} from "react";

export interface ClickAwayListenerProps {
  onClickAway: (event: MouseEvent) => void;
  children?: ReactNode;
}

export default function ClickAwayListener({onClickAway, children}: ClickAwayListenerProps) {
  const onClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      onClickAway(event);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [onClickAway]);

  return <div onClick={onClick}>{children}</div>;
}
