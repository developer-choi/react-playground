import React from 'react';
import {XAxis, XAxisProps} from 'recharts';

/**
 * @param tickLine 나는 보통 좌표에 그 털같이 난거 안쓰는 편이니까.
 * @param dataKey 나는 보통 name을 제일많이쓰니까.
 * @param rest
 */
export default function XAxisExtend({tickLine = false, dataKey = 'name', ...rest}: XAxisProps) {

  return (
      <XAxis tickLine={tickLine} dataKey={dataKey} {...rest}/>
  );
}
