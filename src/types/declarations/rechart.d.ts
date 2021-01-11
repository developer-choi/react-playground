import 'recharts';
import {ComponentType} from 'react';
import {BasicChartData} from '../chart';

declare module 'recharts' {

  interface CustomTooltipProps<PayloadType = BasicChartData> {
    payload?: {payload: PayloadType}[];
    active?: boolean;
    tooltip: ComponentType<BasicChartData>;
  }
}
