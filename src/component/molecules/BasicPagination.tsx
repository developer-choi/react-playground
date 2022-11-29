import React, {memo} from 'react';
import styled from 'styled-components';
import type {PaginationParam, UsePaginationOption} from '@util/services/pagination/pagination-core';
import {myClassName} from '@util/libraries/classnames';
import {useBasicPagination} from '@util/services/pagination/pagination-basic';
import Link from 'next/link';

export interface PaginationProp extends PaginationParam, Partial<UsePaginationOption> {

}

export default memo(function BasicPagination({pageToHref, ...params}: PaginationProp) {
  const {currentPage} = params;
  const {pages, pageToHrefWithDefault, next, first, previous, last, isExistPage} = useBasicPagination(params, {pageToHref});

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

      {pages.map(page => (
        <Link key={page} href={pageToHrefWithDefault(page)} shallow={currentPage === page}>
          <a key={page} className={myClassName({active: currentPage === page})}>{page}</a>
        </Link>
      ))}

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
