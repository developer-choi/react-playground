import React, {ReactNode} from 'react';
import {Pie, PieChart, PieProps, ResponsiveContainer} from 'recharts';
import styled from 'styled-components';
import {FlexDirectionColumn} from '../../../utils/style/css';

interface PieExtendProps extends Partial<Omit<PieProps, 'width' | 'height' | 'ref'>> {
  width?: string | number;
  height?: string | number;
}

export interface PieChartExtendProps extends PieExtendProps {
  centerRender?: ReactNode;
}

export default function PieChartExtend({centerRender, ...rest}: PieChartExtendProps) {

  return !centerRender ? <PieChartInnerRender {...rest}/> : (
      <RelativeWrap>
        <PieChartInnerRender {...rest}/>
        <CenterWrap>
          {centerRender}
        </CenterWrap>
      </RelativeWrap>
  );
}

/**
 * @param strokeWidth 파이간 간격을 거의 붙이는경우는 간격자체를 없애는게 더 이쁨. 그래서 0줌.
 * @param labelLine 나는 털같이 난 차트를 원래 안좋아함.
 * @param outerRadius 가본 100%로 채워야 width height를 꽉채우게 그려져서 마크업할 때 길이계산하기 쉬움.
 * @param dataKey 나는 value로 많이 쓰니까.
 * @param rest
 * @constructor
 */
export function PieChartInnerRender({width, height, strokeWidth = 0, labelLine = false, outerRadius = '100%', dataKey = 'value', ...rest}: PieExtendProps) {
  return (
      <ResponsiveContainer width={width} height={height}>
        <PieChart margin={DEFAULT_MARGIN}>
          <Pie labelLine={labelLine} outerRadius={outerRadius} strokeWidth={strokeWidth} dataKey={dataKey} {...rest}/>
        </PieChart>
      </ResponsiveContainer>
  );
}

const DEFAULT_MARGIN = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

const RelativeWrap = styled.div`
  position: relative;

  .recharts-responsive-container {
    margin: 0 auto;
  }
`;

const CenterWrap = styled.div`
  ${FlexDirectionColumn};
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
