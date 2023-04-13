import type {GetServerSideProps} from 'next';
import {dehydrate, DehydratedPageProps, QueryClient, useQuery} from '@tanstack/react-query';
import {getScrollRestorationDummyApi, ScrollRestorationLinkList} from '@pages/study/next/scroll-restoration/target';

/** Flow (Only Production)
 * 1. (△) (약간의 높이 오차있음) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨.
 *
 * 2. (O) (외부) (약간의 높이 오차있음) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 * 3. (X) (내부) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 *
 * 4. (X) (내부) 목적지에서 뒤로가기눌렀을 때 목적지의 스크롤은 유지됨.
 *
 * ==> 3, 4문제가 해결되야함.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/default/ssr-rq
export default function Page() {
  const {data = []} = useQuery({
    queryKey: ['default-ssr-rq'],
    queryFn: getScrollRestorationDummyApi
  });

  return (
    <ScrollRestorationLinkList list={data}/>
  );
}

export const getServerSideProps: GetServerSideProps<DehydratedPageProps> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['default-ssr-rq'],
    queryFn: getScrollRestorationDummyApi
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
