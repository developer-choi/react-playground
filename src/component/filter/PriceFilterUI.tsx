import React from 'react';
import {CustomSlider} from '@component/atom/forms/CustomSlider';
import {numberWithComma} from '@util/extend/data-type/number';
import {usePriceFilterControl} from '@util/services/product-filter/price-filter';
import styled from 'styled-components';

export default function PriceFilterUI() {
  const control = usePriceFilterControl();

  if (control === undefined) {
    return null;
  }

  const {settingRange, value, onChange, onAfterChange} = control;

  return (
    <Wrap>
      <CustomSlider value={value} settingRange={settingRange} onChange={onChange} onAfterChange={onAfterChange} />
      <div>{numberWithComma(value.min)}원 ~ {numberWithComma(value.max)}원</div>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin-bottom: 20px;
`;
