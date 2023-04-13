import {useScrollRestorationSolution1} from '@util/extend/next';
import {
  getScrollRestorationDummyApi,
  ScrollRestorationExamplePageProp,
  ScrollRestorationLinkList
} from '@pages/study/next/scroll-restoration/target';
import type {GetStaticProps} from 'next';

/** Flow (Only Production)
 * 1. (△) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨. (약간의 높이 오차있음)
 *
 * 2. (O) (외부) (약간의 높이 오차있음) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 * 3. (△) (내부) (약간의 높이 오차있음, 가끔 잘 안됨.) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 *
 * 4. (O) (내부, 아예 안보이긴함) 목적지에서 뒤로가기눌렀을 때 목적지의 스크롤은 유지 됨.
 *
 * ==> default/ssg랑 다를게없음, 모든조건 만족함.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/solution1/ssg
export default function Page({list}: ScrollRestorationExamplePageProp) {
  useScrollRestorationSolution1();

  return (
    <ScrollRestorationLinkList list={list}/>
  );
}

export const getStaticProps: GetStaticProps<ScrollRestorationExamplePageProp> = async () => {
  return {
    props: {
      list: await getScrollRestorationDummyApi()
    }
  };
};
