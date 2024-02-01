import styled from "styled-components";
import ReactSlider from "react-slider";
import React from "react";

export interface MinMaxRange {
  min: number;
  max: number;
}

export interface CustomSliderProp {
  onChange: (value: MinMaxRange) => void;
  onAfterChange?: (value: MinMaxRange) => void;
  value: MinMaxRange;
  settingRange: MinMaxRange;
}

export function CustomSlider({onChange, onAfterChange, value, settingRange}: CustomSliderProp) {
  const corredctedValue = decreaseMinMax(settingRange, value);

  return (
    <StyledSlider
      value={[corredctedValue.min, corredctedValue.max]}
      //@ts-ignore
      onChange={([min, max]) => onChange(increaseMinMax(settingRange, {min, max}))}
      onAfterChange={([min, max]) => onAfterChange?.(increaseMinMax(settingRange, {min, max}))}
      thumbClassName="button"
      trackClassName="track"
      pearling
    />
  );
}

const FIX_RANGE: MinMaxRange = {
  min: 0,
  max: 100
};

function getCorrectRate(settingRange: MinMaxRange) {
  return (settingRange.max - settingRange.min) / (FIX_RANGE.max - FIX_RANGE.min);
}

function decreaseMinMax(settingRange: MinMaxRange, changeRange: MinMaxRange): MinMaxRange {
  const magic = getCorrectRate(settingRange);

  return {
    min: (changeRange.min - settingRange.min) / magic,
    max: (changeRange.max - settingRange.min) / magic
  };
}

function increaseMinMax(settingRange: MinMaxRange, changeRange: MinMaxRange) {
  const magic = getCorrectRate(settingRange);

  return {
    min: changeRange.min * magic + settingRange.min,
    max: changeRange.max * magic + settingRange.min
  };
}

const SQUARE = 15;

const StyledSlider = styled(ReactSlider)`
  display: flex;
  align-items: center;
  height: ${SQUARE}px;
  overflow: hidden;

  .button {
    width: ${SQUARE}px;
    height: ${SQUARE}px;
    border: 1px solid black;
    border-radius: 50%;
    background: white;
  }

  .track {
    width: 100%;
    height: 1px;
    background: black;
  }

  .track-2 {
    display: none;
  }
`;
