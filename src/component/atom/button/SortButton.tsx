import React from 'react';
import styled from 'styled-components';
import {theme} from '@util/services/style/theme';
import type {Sort} from '@util/custom-hooks/useSort';
import useSort from '@util/custom-hooks/useSort';

export interface SortButtonProp<T extends string> {
  currentSort: Sort<T> | undefined;
  orderby: T;
  onSort: (sort?: Sort<T>) => void;
}

export default function SortButton<T extends string>({currentSort, orderby, onSort}: SortButtonProp<T>) {
  const {isActiveAsc, isActiveDesc, onDescClick, onAscClick} = useSort({orderby, currentSort, onSort});

  return (
    <>
      <Button isActive={isActiveAsc} onClick={onAscClick}>{orderby} Asc</Button>
      <Button isActive={isActiveDesc} onClick={onDescClick}>{orderby} Desc</Button>
    </>
  );
}

const Button = styled.button<{isActive: boolean}>`
  background-color: ${props => props.isActive ? theme.main : 'lightgray'};
  margin: 1px;
`;
