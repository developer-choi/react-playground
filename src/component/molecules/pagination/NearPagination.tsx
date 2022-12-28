import React, {memo} from 'react';
import Link from 'next/link';
import {myClassName} from '@util/libraries/classnames';
import styled from 'styled-components';
import type {MultiplePagesPaginationParam} from '@util/services/pagination/pagination-core';
import {getNearPagination} from '@util/services/pagination/pagination-near';

export default memo(function NearPagination(props: MultiplePagesPaginationParam) {
  const {currentPage} = props;
  const {isExistPage, previous, last, next, first, betweenLinkList} = getNearPagination(props);

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

      {betweenLinkList.map(({page, href}) => (
        <Link key={page} href={href} shallow={currentPage === page}>
          <a className={myClassName({active: currentPage === page})}>{page}</a>
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
