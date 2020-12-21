import React from 'react';
import {YAxis, YAxisProps} from 'recharts';

/**
 * @param tickLine 나는 보통 좌표에 그 털같이 난거 안쓰는 편이니까.
 * @param rest
 */
export default function YAxisExtend({tickLine = false, ...rest}: YAxisProps) {

  return (
      <YAxis tickLine={tickLine} {...rest}/>
  );
}
