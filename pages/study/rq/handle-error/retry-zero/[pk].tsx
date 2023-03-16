import React, {useEffect} from 'react';
import type {GetServerSideProps} from 'next';
import {validateNumber} from '@util/extend/browser/query-string';
import {timeoutPromise} from '@util/extend/test';
import {useQuery} from '@tanstack/react-query';
import styled from 'styled-components';
import {useRouter} from 'next/router';

interface PageProp {
  pk: number;
}

// URL: http://localhost:3000/study/rq/handle-error/list
export default function Page({pk}: PageProp) {
  const data = useDetailQuery(pk);

  /**
   * 목표
   * 1. 메인컨텐츠를 CSR할 수 밖에 없는 상황일 때 (메인컨텐츠 API속도가 매우느림)
   * 2. 리다이랙트 처리를 하기위해,
   * 3. 처음에는 오래걸리니까 로딩보여주고
   * 4. 이후에 얼럿창 띄워주고 리다이랙트하려고했으나,
   * 5. 리스트페이지 http://localhost:3000/study/rq/handle-error/list 에서
   * '6번' 링크를 2회차 접속할 때부터 페이지 이동이 되기도전에 얼럿이떠버림. (원인: 캐시)
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
  const query = useQuery({
    queryKey: ['some-detail-query-by-retry-zero', pk],
    queryFn: () => getDetailApi(pk),
    refetchOnWindowFocus: false,
    retry: 0
  });
  const {replace} = useRouter();

  //Bad
  useEffect(() => {
    if (query.data?.visible === false) {
      alert('해당 페이지로 접근할 수 없습니다.');
      replace('/study/rq/handle-error/list');
    }
  }, [query.data?.visible, replace]);

  /** Bad Solution
   * cacheTime = 0으로 설정한다. 그러면 문제는안생김
   * 하지만 버그잡겠다고 캐시의 이점을 버릴수는없음. (API 응답되기전까지 뭐라도보여주는거)
   */

  /** Normal Solution
   * fetching중일때는 리다이랙트 로직 무시
   */
  // useEffect(() => {
  //   if (query.isFetching) {
  //     return;
  //   }
  //
  //   if (query.data?.visible === false) {
  //     alert('해당 페이지로 접근할 수 없습니다.');
  //     replace('/study/rq/handle-error/list');
  //   }
  // }, [query.data?.visible, query.isFetching, replace]);

  return query.data;
}

export function isErrorInRetryExample(pk: number) {
  return pk > 5;
}

async function getDetailApi(pk: number) {
  await timeoutPromise(1000);

  if (isErrorInRetryExample(pk)) {
    return {
      value: '',
      visible: false
    };
  }

  return {
    value: `data-${pk}`,
    visible: true
  };
}
