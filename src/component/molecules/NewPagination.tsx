import React from 'react';
import {PaginationParam, useCorePagination, UsePaginationOption} from '@util/extend/pagination/pagination-core';
import {getNewPagination} from '@util/extend/pagination/pagination-new';
import Link from 'next/link';
import {myClassName} from '@util/libraries/classnames';
import styled from 'styled-components';

export interface NewPaginationProps extends PaginationParam, Partial<UsePaginationOption> {

}

export default function NewPagination({pageToHref, ...params}: NewPaginationProps) {
  const newPagination = getNewPagination(params);
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
};

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
