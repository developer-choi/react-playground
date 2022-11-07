import React from 'react';
import styled from 'styled-components';
import type {PaginationParam} from '@util/extend/pagination';
import {myClassName} from '@util/libraries/classnames';
import {usePagination} from '@util/extend/pagination';
import Link from 'next/link';

export interface PaginationProp extends PaginationParam {
  pageToHref?: () => void;
}

export default function Pagination({config, currentPage, total}: PaginationProp) {
  const {pages, pageToHref, next, first, previous, last, isExistPage} = usePagination({
    config,
    currentPage,
    total,
  });

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
        <Link key={page} href={pageToHref(page)} shallow={currentPage === page}>
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
}

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
