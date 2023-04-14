import type {GetStaticProps} from 'next';
import {
  getScrollRestorationDummyApi,
  SCROLL_RESTORATION_HREFS,
  ScrollRestorationExamplePageProp,
  ScrollRestorationLinkList
} from '@component/others/scroll-restoration';
import {useScrollRestoration} from '@util/extend/scroll-restoration';

/** Flow (Only Production)
 * 1. (△) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨. (약간의 높이 오차있음)
 * 2. (O) (내부) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 * 3. (O) (내부, 아예 안보이긴함) 목적지에서 뒤로가기눌렀을 때 목적지의 스크롤은 유지 됨.
 * 4. (O) 앞으로가기했을 때 목적지 스크롤복원도 잘됨.
 *
 * ==> 별다른 문제없음.
 * ==> 2번이 default와 다르게 항상잘됨.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/my-solution/ssg
export default function Page({list}: ScrollRestorationExamplePageProp) {
  useScrollRestoration();

  return (
    <ScrollRestorationLinkList list={list}/>
  );
}

export const getStaticProps: GetStaticProps<ScrollRestorationExamplePageProp> = async () => {
  return {
    props: {
      list: await getScrollRestorationDummyApi(SCROLL_RESTORATION_HREFS.mySolution)
    }
  };
};
