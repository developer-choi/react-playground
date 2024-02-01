import React, {memo} from "react";
import styled from "styled-components";
import type {MultiplePagesPaginationComponentProps} from "@util/services/pagination/pagination-core";
import {getBasicPagination} from "@util/services/pagination/pagination-basic";
import PageElement from "@component/atom/PageElement";

export default memo(function BasicPagination({methods, linkProps, ...params}: MultiplePagesPaginationComponentProps) {
  const pagination = getBasicPagination(params);

  if (pagination === null) {
    return null;
  }

  const {betweenPageElementDataList, next, last, first, previous} = pagination;

  return (
    <Wrap>
      <StyledPageElement data={first} methods={methods} {...linkProps}>
        {"<<"}
      </StyledPageElement>

      <StyledPageElement data={previous} methods={methods} {...linkProps}>
        {"<"}
      </StyledPageElement>

      {betweenPageElementDataList.map((data) => (
        <StyledPageElement key={data.page} data={data} methods={methods} {...linkProps}>
          {data.page}
        </StyledPageElement>
      ))}

      <StyledPageElement data={next} methods={methods} {...linkProps}>
        {">"}
      </StyledPageElement>

      <StyledPageElement data={last} methods={methods} {...linkProps}>
        {">>"}
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
    background: ${(props) => props.theme.main};
    color: white;
  }

  &.disable {
    color: lightgray;
  }
`;
