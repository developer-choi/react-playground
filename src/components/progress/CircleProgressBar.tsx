import React, {ComponentProps} from 'react';
import styled from 'styled-components';
import {PolarAngleAxis, RadialBar, RadialBarChart} from 'recharts';
import {theme} from '../../utils/style/theme';

export interface CircleProgressBarProp extends Omit<ComponentProps<'div'>, 'ref'> {
  progress: number;
  radius?: number;
}

export default function CircleProgressBar({progress, radius = 100, children, ...rest}: CircleProgressBarProp) {

  return (
      <Wrap {...rest}>
        <RadialBarChart width={radius * 2} height={radius} cx={radius} cy={radius} innerRadius={radius * 0.88} outerRadius={radius} data={[{value: progress * 100}]} startAngle={180} endAngle={0}>
          {/*//@ts-ignore*/}
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false}/>
          <RadialBar background dataKey="value" fill={theme.main}/>
        </RadialBarChart>
        <Inner>
          {children}
        </Inner>
      </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
`;

const Inner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
