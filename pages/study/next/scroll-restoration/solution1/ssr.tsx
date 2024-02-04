import type {GetServerSideProps} from 'next';
import {useScrollRestorationSolution1} from '@util/extend/legacy/legacy-scroll-restoration1';
import {
  getScrollRestorationDummyApi,
  SCROLL_RESTORATION_HREFS,
  ScrollRestorationExamplePageProp,
  ScrollRestorationLinkList
} from '@component/others/scroll-restoration';

/** Flow (Only Production) + solution/target.tsx에서  useScrollRestorationSolution1(); 주석처리한 기준
 * 1. (△) (약간의 높이 오차있음) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨.
 * 2. (O) (내부) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 * 3. (X) (내부) 목적지에서 뒤로가기눌렀을 때 목적지의 스크롤은 유지됨.
 * 4. (X) (애매함. 그냥 안된다고보는게 맞을듯. 스크롤위치도 계속바뀌고 그럼.) 앞으로가기했을 때 목적지 스크롤복원도 잘됨.
 */

/** Flow (Only Production) + solution/target.tsx에서  useScrollRestorationSolution1(); 주석처리 안한기준
 * 2. (X) (내부) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨. << 이게 적용안됨.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/solution1/ssr
export default function Page({list}: ScrollRestorationExamplePageProp) {
  useScrollRestorationSolution1();

  return (
    <ScrollRestorationLinkList list={list}/>
  );
}

export const getServerSideProps: GetServerSideProps<ScrollRestorationExamplePageProp> = async () => {
  return {
    props: {
      list: await getScrollRestorationDummyApi(SCROLL_RESTORATION_HREFS.solution1)
    }
  };
};
