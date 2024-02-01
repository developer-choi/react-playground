import FilterController from "@component/filter/FilterController";
import AppliedFilterResultList from "@component/filter/AppliedFilterResultList";
import FilteredProductList from "@component/filter/FilteredProductList";
import React from "react";
import styled from "styled-components";

export default function ProductListPage() {
  return (
    <Wrap>
      <FilterController />
      <AppliedFilterResultList />
      <FilteredProductList />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 20px;
`;
