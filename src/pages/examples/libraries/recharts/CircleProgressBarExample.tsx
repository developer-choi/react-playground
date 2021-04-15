import React, {ComponentProps, useEffect, useState} from 'react';
import styled from 'styled-components';
import {PolarAngleAxis, RadialBar, RadialBarChart} from 'recharts';
import {theme} from '../../../../utils/style/theme';

export default function CircleProgressBarExample() {
  
  const [progress, setProgress] = useState(0.5);
  
  useEffect(() => {
    setInterval(() => {
      setProgress(prevState => prevState + (Math.random() > 0.5 ? Math.random() / 5 : -1 * Math.random() / 5));
    }, 3000);
  }, []);
  
  return (
      <CircleProgressBar progress={progress}/>
  );
}

interface CircleProgressBarProp extends Omit<ComponentProps<'div'>, 'ref'> {
  progress: number;
  radius?: number;
}

function CircleProgressBar({progress, radius = 100, children, ...rest}: CircleProgressBarProp) {
  
  return (
      <Wrap {...rest}>
        <RadialBarChart width={radius * 2} height={radius * 2} cx={radius} cy={radius} innerRadius={radius * 0.88} outerRadius={radius} data={[{value: progress * 100}]} startAngle={180} endAngle={-180}>
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
