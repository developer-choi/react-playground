import React from 'react';
import styled from 'styled-components';
import type {SortButtonParam} from '@util/custom-hooks/useSortButton';
import {useSortButton} from '@util/custom-hooks/useSortButton';

export interface SortButtonsProp<OrderbyType extends string> extends SortButtonParam<OrderbyType> {
  // another props
}

export default function SortButtons<OrderbyType extends string>({orderby, onSort, currentSort, ...rest}: SortButtonsProp<OrderbyType>) {
  
  const {currentDirection, onDescClick, onAscClick} = useSortButton({orderby, onSort, currentSort});
  
  return (
      <Wrap className="sort-button-wrap" {...rest}>
        <button className={currentDirection === 'asc' ? 'active' : ''} onClick={onAscClick}>
          <img src="/images/triangle.png" alt="up img"/>
        </button>
        <button className={currentDirection === 'desc' ? 'active' : ''} onClick={onDescClick}>
          <img src="/images/triangle.png" alt="down img"/>
        </button>
      </Wrap>
  );
}

const Wrap = styled.div`
  display: inline-flex;
  
  img {
    width: 12px;
    height: 10px;
  }
  
  button {
    font-size: 0;
  }
  
  button:nth-child(2) {
    margin-top: 3px;
    
    img {
      transform: rotate(180deg);
    }
  }
`;

