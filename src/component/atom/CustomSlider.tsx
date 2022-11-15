import styled from 'styled-components';
import ReactSlider from 'react-slider';
import React from 'react';

export interface MinMaxRange {
  min: number;
  max: number;
}

/** Limitations
 * min값은 반드시 0만 가능. (음수 안되고 0보다 큰 양수도 안됨)
 * max값은 기본적으로 100만 가능하지만, 트릭을 통해 100보다 큰값도 가능함. 하지만 100 미만은 안됨.
 */
export interface CustomSliderProp {
  initialMax: number;
  onChange: (value: MinMaxRange) => void;
}

export function CustomSlider({initialMax, onChange}: CustomSliderProp) {
  const magic = initialMax / 100;

  return (
    <StyledSlider
      //@ts-ignore
      onChange={([min, max]) => onChange({min: min * magic, max: max * magic})}
      thumbClassName="button"
      trackClassName="track"
      defaultValue={[0, initialMax]}
      pearling
    />
  );
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
