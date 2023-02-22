import React from 'react';
import {useDelay} from '@util/extend/time';
import {timeoutPromise} from '@util/extend/test';
import {useQuery} from '@tanstack/react-query';

// URL: http://localhost:3000/study/rq/delay
export default function Page() {
  const enabled = useDelay(1000);

  const {data} = useQuery({
    queryKey: ['rq-enabled'],
    queryFn: getNameApi,
    enabled
  });

  return (
    <div>{data?.name}</div>
  );
}

async function getNameApi() {
  console.log('request');
  await timeoutPromise(500);
  return {
    name: '홍길동'
  };
}
