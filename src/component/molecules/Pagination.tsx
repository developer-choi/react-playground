import React from 'react';
import styled from 'styled-components';
import {usePagination} from '@util/custom-hooks/usePagination';
import type {PaginationParam} from '@util/paging';
import {myClassName} from '@util/libraries/classnames';

export interface PaginationProp extends PaginationParam {
}

export default function Pagination({articlePerPage, pagePerView, currentPage, total}: PaginationProp) {
  const {
    canNext,
    canLast,
    canFirst,
    canPrevious,
    goLastPage,
    goPage,
    pages,
    goPreviousPage,
    goFirstPage,
    goNextPage
  } = usePagination({articlePerPage, pagePerView, currentPage, total});

  if (pages.length === 0) {
    return null;
  }

  return (
    <Wrap>
      <button className={myClassName({disable: !canFirst})} onClick={goFirstPage}>{'<<'}</button>
      <button className={myClassName({disable: !canPrevious})} onClick={goPreviousPage}>{'<'}</button>
      {pages.map(page => (
        <button key={page} className={myClassName({active: currentPage === page})} onClick={() => goPage(page)}>{page}</button>
      ))}
      <button className={myClassName({disable: !canNext})} onClick={goNextPage}>{'>'}</button>
      <button className={myClassName({disable: !canLast})} onClick={goLastPage}>{'>>'}</button>
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
