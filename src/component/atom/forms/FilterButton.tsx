import React, {ComponentPropsWithoutRef, useCallback} from "react";
import styled from "styled-components";

export interface FilterButtonProp<T> extends Omit<ComponentPropsWithoutRef<"button">, "value" | "onClick"> {
  currentFilter: T | undefined;
  value: T;
  onFilter: (value: T | undefined) => void;
}

export default function FilterButton<T>({value, onFilter, currentFilter, ...rest}: FilterButtonProp<T>) {
  const isActive = currentFilter === value;

  const onClick = useCallback(() => {
    onFilter(!isActive ? value : undefined);
  }, [isActive, onFilter, value]);

  return <Button isActive={isActive} onClick={onClick} {...rest} />;
}

const Button = styled.button<{isActive: boolean}>`
  background: ${(props) => (props.isActive ? props.theme.main : "lightgray")};
  margin: 1px;
`;
