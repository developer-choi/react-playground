import React from 'react';
import styled from 'styled-components';
import {usePagination} from '@util/custom-hooks/usePagination';
import type {PaginationParam} from '@util/paging';
import {myClassName} from '@util/libraries/classnames';

export interface PaginationProp extends PaginationParam {
}

export default function Pagination({articlePerPage, pagePerView, currentPage, total}: PaginationProp) {
  const {pages, move, next, first, previous, last} = usePagination({
    articlePerPage,
    pagePerView,
    currentPage,
    total
  });

  if (pages.length === 0) {
    return null;
  }

  return (
    <Wrap>
      <button className={myClassName({disable: !first.movable})} onClick={first.move}>{'<<'}</button>
      <button className={myClassName({disable: !previous.movable})} onClick={previous.move}>{'<'}</button>
      {pages.map(page => (
        <button key={page} className={myClassName({active: currentPage === page})} onClick={() => move(page)}>{page}</button>
      ))}
      <button className={myClassName({disable: !next.movable})} onClick={next.move}>{'>'}</button>
      <button className={myClassName({disable: !last.movable})} onClick={last.move}>{'>>'}</button>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  
  > button {
    padding: 5px;
    margin: 2px 0;
    
    &.active {
      background: ${props => props.theme.main};
      color: white;
    }
    
    &.disable {
      color: lightgray;
      cursor: not-allowed;
    }
  }
`;
