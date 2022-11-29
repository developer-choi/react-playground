import React, {memo} from 'react';
import {PaginationParam, useCorePagination, UsePaginationOption} from '@util/services/pagination/pagination-core';
import {getShortPagination} from '@util/services/pagination/pagination-short';
import Link from 'next/link';
import {myClassName} from '@util/libraries/classnames';
import styled from 'styled-components';

export interface ShortPaginationProp extends PaginationParam, Partial<UsePaginationOption> {

}

export default memo(function ShortPagination({pageToHref, ...params}: ShortPaginationProp) {
  const newPagination = getShortPagination(params);
  const {isExistPage, next, first, previous, totalPage, last} = useCorePagination(newPagination, params, {pageToHref});

  if (!isExistPage) {
    return null;
  }

  return (
    <Wrap>
      <Link href={first.href} shallow={!first.movable}>
        <a className={myClassName({disable: !first.movable})}>{'<<'}</a>
      </Link>
      <Link href={previous.href} shallow={!previous.movable}>
        <a className={myClassName({disable: !previous.movable})}>{'<'}</a>
      </Link>

      <span>{params.currentPage} / {totalPage}</span>

      <Link href={next.href} shallow={!last.movable}>
        <a className={myClassName({disable: !next.movable})}>{'>'}</a>
      </Link>
      <Link href={last.href} shallow={!last.movable}>
        <a className={myClassName({disable: !last.movable})}>{'>>'}</a>
      </Link>
    </Wrap>
  );
});

const Wrap = styled.div`
  display: flex;
  align-items: center;
  
  > a {
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
