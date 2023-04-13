import type {GetServerSideProps} from 'next';
import {
  getScrollRestorationDummyApi,
  ScrollRestorationExamplePageProp,
  ScrollRestorationLinkList
} from '@pages/study/next/scroll-restoration/target';

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

// URL: http://localhost:3000/study/next/scroll-restoration/default/ssr
export default function Page({list}: ScrollRestorationExamplePageProp) {
  return (
    <ScrollRestorationLinkList list={list}/>
  );
}

export const getServerSideProps: GetServerSideProps<ScrollRestorationExamplePageProp> = async () => {
  return {
    props: {
      list: await getScrollRestorationDummyApi()
    }
  };
};
