import React, {memo} from 'react';
import styled from 'styled-components';
import type {MultiplePagesPaginationComponentProps} from '@util/services/pagination/pagination-core';
import {getNearPagination} from '@util/services/pagination/pagination-near';
import PageElement from '@component/atom/PageElement';

export default memo(function NearPagination({methods, ...params}: MultiplePagesPaginationComponentProps) {
  const pagination = getNearPagination(params);

  if (pagination === null) {
    return null;
  }

  const {betweenPageElementDataList, last, next, first, previous} = pagination;

  return (
    <Wrap>
      <StyledPageElement data={first} methods={methods}>
        {'<<'}
      </StyledPageElement>

      <StyledPageElement data={previous} methods={methods}>
        {'<'}
      </StyledPageElement>

      {betweenPageElementDataList.map(data => (
        <StyledPageElement key={data.page} data={data} methods={methods}>
          {data.page}
        </StyledPageElement>
      ))}

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
`;

const StyledPageElement = styled(PageElement)`
  padding: 5px;
  margin: 2px 0;
  
  &.active {
    color: ${props => props.theme.main};
    font-weight: bold;
  }
  
  &.disable {
    color: lightgray;
  }
`;
