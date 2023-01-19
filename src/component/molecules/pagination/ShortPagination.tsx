import React, {memo} from 'react';
import type {CorePaginationComponentProps} from '@util/services/pagination/pagination-core';
import {getShortPagination} from '@util/services/pagination/pagination-short';
import styled from 'styled-components';
import PageElement from '@component/atom/PageElement';

export default memo(function ShortPagination({methods, ...params}: CorePaginationComponentProps) {
  const pagination = getShortPagination(params);

  if (pagination === null) {
    return null;
  }

  const {next, last, first, previous, totalPage} = pagination;
  const {currentPage} = params;

  return (
    <Wrap>
      <StyledPageElement data={first} methods={methods}>
        {'<<'}
      </StyledPageElement>

      <StyledPageElement data={previous} methods={methods}>
        {'<'}
      </StyledPageElement>

      <span>{currentPage} / {totalPage}</span>

      <StyledPageElement data={next} methods={methods}>
        {'>'}
      </StyledPageElement>

      <StyledPageElement data={last} methods={methods}>
        {'>>'}
      </StyledPageElement>
    </Wrap>
  );
});

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPageElement = styled(PageElement)`
  padding: 5px;
  margin: 2px 0;
  
  &.disable {
    color: white;
    background-color: lightgray;
  }
`;
