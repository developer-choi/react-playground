import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {numberWithComma} from '@util/extend/data-type/number';
import {CustomSlider, MinMaxRange} from '@component/atom/forms/CustomSlider';
import Button from '@component/atom/element/Button';
import {useLogWhenRendering} from '@util/extend/test';

// URL: http://localhost:3000/experimental/components/form/react-slider
export default function Page() {
  const [settingRate, setSettingRate] = useState(INITIAL_RANGE);
  const [range, setRange] = useState<MinMaxRange>(settingRate);
  const [afterRange, setAfterRange] = useState<MinMaxRange>(settingRate);

  useLogWhenRendering('range', range);
  useLogWhenRendering('afterRange', afterRange);

  useEffect(() => {
    setRange(settingRate);
    setAfterRange(settingRate);
  }, [settingRate]);

  const increase = useCallback(() => {
    setRange(prevState => ({
      min: prevState.min + 10,
      max: prevState.max
    }));
  }, []);

  const decrease = useCallback(() => {
    setRange(prevState => ({
      min: prevState.min,
      max: prevState.max - 10
    }));
  }, []);

  const changeSettingRate = useCallback(() => {
    setSettingRate(prevState => ({
      min: prevState.min + 1000,
      max: prevState.max + 1000
    }));
  }, []);

  return (
    <Wrap>
      <CustomSlider settingRange={settingRate} value={range} onChange={setRange} onAfterChange={setAfterRange}/>
      <span>{numberWithComma(range.min)}</span> <span> ~ </span> <span>{numberWithComma(range.max)}</span>
      <Button onClick={increase}>Increase</Button>
      <Button onClick={decrease}>Decrease</Button>
      <Button onClick={changeSettingRate}>Change setting rate</Button>
    </Wrap>
  );
}

const INITIAL_RANGE: MinMaxRange = {
  min: 1000,
  max: 2000
};

const Wrap = styled.div`
  width: 200px;
  padding: 20px;
`;
