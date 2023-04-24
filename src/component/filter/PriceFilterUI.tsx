import React from 'react';
import {CustomSlider} from '@component/atom/forms/CustomSlider';
import {numberWithComma} from '@util/extend/data-type/number';
import {usePriceFilterControl} from '@util/services/product-filter/price-filter';

export default function PriceFilterUI() {
  const {enabled, settingRange, value, onChange, onAfterChange} = usePriceFilterControl();

  if (!enabled) {
    return null;
  }

  return (
    <>
      <CustomSlider value={value} settingRange={settingRange} onChange={onChange} onAfterChange={onAfterChange} />
      <div>{numberWithComma(value.min)}원 ~ {numberWithComma(value.max)}원</div>
    </>
  );
}
