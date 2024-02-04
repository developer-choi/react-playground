import React from 'react';
import styled from 'styled-components';
import Button from '@component/atom/element/Button';
import {useHandleFilterForm} from '@util/services/product-filter/filter-form';
import {CategoryFilterListUI, GeneralFilterListUI} from '@component/filter/FilterListUI';
import PriceFilterUI from '@component/filter/PriceFilterUI';

export default function FilterForm() {
  const {onSubmit, reset} = useHandleFilterForm();

  return (
    <Form onSubmit={onSubmit}>
      <CategoryFilterListUI/>
      <GeneralFilterListUI filterType="brand"/>
      <GeneralFilterListUI filterType="color"/>
      <GeneralFilterListUI filterType="size"/>
      <PriceFilterUI/>
      <Button className="gray" onClick={reset}>초기화</Button>
      <Button type="submit">제출</Button>
    </Form>
  );
}

const Form = styled.form`
  display: inline-block;
`;
