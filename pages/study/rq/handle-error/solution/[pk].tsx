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

/** 기존문제 (기준: useBadQuery)
 * 1. 메인컨텐츠를 CSR할 수 밖에 없는 상황일 때 (메인컨텐츠 API속도가 매우느림)
 * 2. 리다이랙트 처리를 하기위해,
 * 3. 처음에는 오래걸리니까 로딩보여주고
 * 4. 이후에 얼럿창 띄워주고 리다이랙트하려고했으나,
 * 5. 리스트페이지 http://localhost:3000/study/rq/handle-error/list 에서
 * '6번' 링크를 2회차 접속할 때부터 페이지 이동이 되기도전에 얼럿이떠버림. (원인: 캐시)
 */

/** 목표
 * 1. api에서 4xx 5xx같은 에러응답을 해도 실패해야하고,
 * 2. api에서 200이지만 응답데이터에 특정 boolean값이 false여도 실패해야함. (진열상태 등)
 * 3. 이 과정중에는 로딩UI가 보여야함. (2번의 케이스에서 빈값 빈데이터 뭐 이런거 보이면안됨)
 */

// URL: http://localhost:3000/study/rq/handle-error/list
export default function Page({pk}: PageProp) {
  // const {data} = useBadQuery(pk);
  // const {data} = useNormalQuery(pk);
  const {data} = useSolutionQuery(pk);

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

function getCommonOption(pk: number) {
  return {
    queryKey: ['some-detail-query-by-retry-zero', pk],
    queryFn: () => getDetailApi(pk),
    refetchOnWindowFocus: false,
    retry: false
  };
}

/** Flow
 * [success] 링크 클릭했을 때
 * 목표대로 정상동작함.
 *
 * [success-but-error-response 링크 클릭했을 때]
 * 1. success-but-error-response 링크로 접속하면 최초에는 목표대로 작동하지만,
 * 2. 두번째 접속할 때는 페이지이동도안되고 바로 에러뜸. (이유: 캐시)
 *
 * [throw-error] 링크 클릭했을 때
 * 의도대로 동작하지않음.
 */
function useBadQuery(pk: number) {
  const query = useQuery(getCommonOption(pk));

  const {replace} = useRouter();

  useEffect(() => {
    if (query.data?.visible === false) {
      alert('해당 페이지로 접근할 수 없습니다.');
      replace('/study/rq/handle-error/list');
    }
  }, [query.data?.visible, replace]);

  return {
    data: query.data
  };
}

/** Flow
 * [success] 링크 클릭했을 때
 * 목표대로 정상동작함.
 *
 * [success-but-error-response 링크 클릭했을 때]
 * 1. success-but-error-response 링크로 접속하면 최초에는 목표대로 작동하지만,
 * 2. 두 번째 이후 접속할 떄에도 목표대로 작동함.
 * 하지만 cacheTime = 0으로 설정해서
 * 캐시의 장점을버렸음. (API 응답되기전까지 뭐라도보여주는거 라던가)
 *
 * [throw-error] 링크 클릭했을 때
 * 의도대로 동작하지않음.
 */
function useNormalQuery(pk: number) {
  const query = useQuery({
    ...getCommonOption(pk),
    cacheTime: 0, //이부분이 useBadQuery()와 다름.
  });

  const {replace} = useRouter();

  useEffect(() => {
    if (query.data?.visible === false) {
      alert('해당 페이지로 접근할 수 없습니다.');
      replace('/study/rq/handle-error/list');
    }
  }, [query.data?.visible, replace]);

  return {
    data: query.data
  };
}

function useSolutionQuery(pk: number) {
  const query = useQuery(getCommonOption(pk));
  const availableDetailPage = query.data?.visible === true;

  const {replace} = useRouter();

  useEffect(() => {
    //이부분으로 2번째 접근했을 때 캐시데이터(에러)가 있을 때 기존 에러데이터를 기준으로 리다이랙트하는 로직이 실행되지않도록 하고,
    if (query.isFetching) {
      return;
    }

    //이부분으로 API 응답이 4xx 5xx일 떄 대응함.
    if (query.isError) {
      alert('(다른메시지) 해당 페이지로 접근할 수 없습니다.');
      replace('/study/rq/handle-error/list');
      return;
    }

    //이부분으로 API응답은 200인데 해당 상세페이지를 볼 수 없는 경우(진열상태 등)를 대응함.
    if (!availableDetailPage) {
      alert('해당 페이지로 접근할 수 없습니다.');
      replace('/study/rq/handle-error/list');
    }
  }, [availableDetailPage, query.isError, query.isFetching, replace]);

  if (!availableDetailPage) {
    return {
      isLoading: true,
      data: undefined
    };
  }

  return {
    isLoading: false,
    data: query.data
  };
}

export function getHandleRQErrorExample(pk: number) {
  const value = `data-${pk}`;

  if (pk >= 3) {
    return {
      type: 'throw-error' as 'throw-error',
      visible: false,
      value
    };
  }

  if (pk === 2) {
    return {
      type: 'success-but-error-data' as 'success-but-error-data',
      visible: false,
      value
    };
  }

  return {
    type: 'success' as 'success',
    visible: true,
    value
  };
}

async function getDetailApi(pk: number) {
  console.log('getDetailApi called');

  await timeoutPromise(500);

  const result = getHandleRQErrorExample(pk);

  if (result.type === 'throw-error') {
    throw new Error('Some errors are occurred.');
  }

  return result;
}
