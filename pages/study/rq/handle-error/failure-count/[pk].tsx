import React, {useEffect} from 'react';
import type {GetServerSideProps} from 'next';
import {validateNumber} from '@util/extend/browser/query-string';
import {timeoutPromise} from '@util/extend/test';
import {useQuery} from '@tanstack/react-query';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {isErrorInRetryExample} from '@pages/study/rq/handle-error/retry-zero/[pk]';

interface PageProp {
  pk: number;
}

// URL: http://localhost:3000/study/rq/handle-error/list
export default function Page({pk}: PageProp) {
  const data = useDetailQuery(pk);

  /**
   * 목표
   * ./retry-zero/[pk].tsx와 같음.
   * '6번' 링크를 2회차 접속할 때부터 페이지 이동이 되기도전에 얼럿이떠버림. (원인: failureCount가 2회차 접근일 때 처음부터 1임)
   * retry: 0으로 설정해놓고 다시 시도해도 여전히 2회차접근일 때 failureCount가 1부터시작함.
   */
  if (!data?.value) {
    return (
      <Wrap>로딩중</Wrap>
    );
  }

  return (
    <Wrap>{data.value}</Wrap>
  );
}

const Wrap = styled.div`
  padding: 10px;
  font-size: 20px;
`;

type ParamType = {
  pk: string;
}

export const getServerSideProps: GetServerSideProps<PageProp, ParamType> = async ({params}) => {
  try {
    const pk = validateNumber(params?.pk);

    return {
      props: {
        pk
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/study/rq/handle-error/list',
        permanent: false
      }
    };
  }
};

function useDetailQuery(pk: number) {
  const {data, failureCount} = useQuery({
    queryKey: ['some-detail-query-by-failure-count', pk],
    queryFn: () => getDetailApi(pk),
    refetchOnWindowFocus: false,
    // retry: 0 << retry: 0으로 설정해놓고 다시 시도해도 여전히 2회차접근일 때 failureCount가 1부터시작함.
  });
  const {replace} = useRouter();

  console.log('failureCount', failureCount);

  //Bad
  useEffect(() => {
    if (failureCount > 0) {
      alert('해당 페이지로 접근할 수 없습니다.');
      replace('/study/rq/handle-error/list');
    }
  }, [failureCount, replace]);

  return data;
}

async function getDetailApi(pk: number) {
  await timeoutPromise(1000);

  if (isErrorInRetryExample(pk)) {
    throw new Error('Unavailable');
  }

  return {
    value: `data-${pk}`,
    visible: true
  };
}
