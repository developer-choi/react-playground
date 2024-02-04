import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {useLogWhenAllRendering} from '@util/extend/test';

/**
 * initial-data의 index 테스트를 위한 페이지
 */
export default function Page() {
  const {data} = useQuery({
    queryKey: QUERY_KEY,
    enabled: false,
    initialData: 'initial data'
  })

  useLogWhenAllRendering('data', data);

  return (
    <div>{data}</div>
  );
}

const QUERY_KEY = ['stale-time/initial-data']
