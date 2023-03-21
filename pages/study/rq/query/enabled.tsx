import React from 'react';
import {useQuery} from '@tanstack/react-query';

// URL: http://localhost:3000/study/rq/query/enabled
export default function Page() {
  const {data} = useQuery({
    queryKey: ['some-query-key'],
    queryFn: someApi,
    enabled: undefined
  });

  return (
    <div>{data}</div>
  );
}

async function someApi() {
  console.log('Call some API');
  return 'data';
}
