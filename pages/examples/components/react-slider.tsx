import React, {useState} from 'react';
import styled from 'styled-components';
import {numberWithComma} from '@util/extend/number';
import {CustomSlider, MinMaxRange} from '@component/atom/CustomSlider';

export default function Page() {
  const [range, setRange] = useState<MinMaxRange>(INITIAL_RANGE);

  return (
    <Wrap>
      <CustomSlider initialMax={INITIAL_RANGE.max} onChange={setRange}/>
      <span>{numberWithComma(range.min)}</span> <span> ~ </span> <span>{numberWithComma(range.max)}</span>
    </Wrap>
  );
}

const INITIAL_RANGE: MinMaxRange = {
  min: 0,
  max: 2000
};

const Wrap = styled.div`
  width: 200px;
  padding: 20px;
`;
