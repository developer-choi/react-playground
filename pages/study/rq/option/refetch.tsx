import React from 'react';
import {useQuery} from '@tanstack/react-query';

// URL: http://localhost:3000/study/rq/option/refetch
export default function Page() {
  const {data} = useQuery({
    queryKey: ['rq-enabled'],
    queryFn: getNameApi,
    staleTime: Infinity
  });

  return (
    <div>{data?.name}</div>
  );
}

async function getNameApi() {
  console.log('request');
  return {
    name: '홍길동'
  };
}
