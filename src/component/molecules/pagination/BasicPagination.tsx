import React, {memo} from 'react';
import styled from 'styled-components';
import type {MultiplePagesPaginationParam} from '@util/services/pagination/pagination-core';
import {myClassName} from '@util/libraries/classnames';
import Link from 'next/link';
import {getBasicPagination} from '@util/services/pagination/pagination-basic';

export default memo(function BasicPagination(props: MultiplePagesPaginationParam) {
  const {currentPage} = props;
  const {betweenLinkList, previous, isExistPage, next, last, first} = getBasicPagination(props);

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

      {betweenLinkList.map(({href, page}) => (
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
