import React from "react";
import styled from "styled-components";
import {useCurrentCheckedFilterResultList} from "@util/services/product-filter/filter-form";

export default function CheckedFilterList() {
  const currentCheckedFilterList = useCurrentCheckedFilterResultList();

  return (
    <Wrap>
      체크된 필터 목록:
      {currentCheckedFilterList.map(({pk, type, name}) => (
        <CheckedFilter key={`${type}-${pk}`}>{name}</CheckedFilter>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  margin-bottom: 20px;
`;

const CheckedFilter = styled.span`
  color: blueviolet;
  font-weight: bold;
  font-size: 14px;
  margin-left: 5px;
`;
