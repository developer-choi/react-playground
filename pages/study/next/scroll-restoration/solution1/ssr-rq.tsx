import type {GetServerSideProps} from 'next';
import {dehydrate, DehydratedPageProps, QueryClient, useQuery} from '@tanstack/react-query';
import {getScrollRestorationDummyApi, ScrollRestorationLinkList} from '@pages/study/next/scroll-restoration/target';
import {useScrollRestorationSolution1} from '@util/extend/next';

/** Flow (Only Production)
 * 1. (△) (약간의 높이 오차있음) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨.
 *
 * 2. (O) (외부) (약간의 높이 오차있음) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 * 3. (O) (내부) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 *
 * 4. (X) (내부) 목적지에서 뒤로가기눌렀을 때 목적지의 스크롤은 유지됨.
 *
 * ==> default/ssr-rq 기준 3번이 해결...되었으나 스크롤 복구하는과정에서 내려오는게 눈에보임. (애니메이션하면 덜 흉함.)
 * ==> ssr, ssr-rq랑 동작이 100%일치함.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/solution1/ssr-rq
export default function Page() {
  useScrollRestorationSolution1();

  const {data = []} = useQuery({
    queryKey: ['solution1-ssr-rq'],
    queryFn: getScrollRestorationDummyApi
  });

  return (
    <ScrollRestorationLinkList list={data}/>
  );
}

export const getServerSideProps: GetServerSideProps<DehydratedPageProps> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['solution1-ssr-rq'],
    queryFn: getScrollRestorationDummyApi
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
