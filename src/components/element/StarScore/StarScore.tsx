import {CSSProperties} from 'react';
import FullStarIcon from '@/components/icon/FullStarIcon';
import HalfStarIcon from '@/components/icon/HalfStarIcon';

export interface StarScoreProps {
  score: number;
  style?: CSSProperties;
  className?: string;
}

export default function StarScore({score, style, className}: StarScoreProps) {
  return (
    <div style={style} className={className}>
      {getStarScoreArray(score).map((star, index) => star === 0.5 ?
        <HalfStarIcon key={index} activeFill={COLOR.active} inactiveFill={COLOR.inactive}/>
        :
        <FullStarIcon key={index} fill={star == 1 ? COLOR.active : COLOR.inactive}/>
      )}
    </div>
  );
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const COLOR = {
  active: 'green',
  inactive: 'lightgray'
}

function getStarScoreArray(value: number): StarUnitType[] {
  const result = classifyValue(value);
  return new Array(CONFIG.max).fill(0).map((_, index) => {
    const unitValue = index + 1;
    if (unitValue <= result) {
      return 1;
    } else if ((result % 1 === 0.5) && result + 0.5 === unitValue) {
      return 0.5;
    } else {
      return 0;
    }
  });
}

/**
 * 주어진 값(value)을 CONFIG.unit 단위로 분류하여 해당 범위의 시작 값을 반환하는 함수.
 * @param value 분류할 실수 값.
 * @returns 분류된 값.
 *
 * @example config의 unit이 0.5, max가 5.0인 경우 다음과같이 동작함
 * 0 이상 0.5 미만 = 0
 * 0.5 이상 1 미만 = 0.5
 * 1 이상 1.5 미만 = 1
 * ~~~~~~~~~~~~~~~~~~
 * 4.5 이상 5 미만 = 4.5
 * 5 이상 = 5
 */
function classifyValue(value: number): number {
  if (value >= CONFIG.max) {
    return CONFIG.max;
  }

  // 반복적으로 CONFIG.unit 단위로 범위를 검사
  for (let i = 0; i < CONFIG.max; i += CONFIG.unit) {
    if (value >= i && value < i + CONFIG.unit) {
      return i;
    }
  }

  // 0 이상 5 미만의 값을 가지기 때문에 기본적으로 0 반환
  return 0;
}

interface ClassifyNumberConfig {
  max: number;
  unit: number;
}

/**
 * 1 = (active color로) 꽉찬 별
 * 0.5 = 반만 찬 별
 * 0 = (inactive color로) 꽉찬 별
 */
type StarUnitType = 1 | 0.5 | 0;

const CONFIG: ClassifyNumberConfig = {
  max: 5.0, // 별 갯수도 뜻하므로 반드시 자연수로 설정되야함.
  unit: 0.5
}
