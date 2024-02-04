import type {GetServerSideProps} from 'next';
import {
  getScrollRestorationDummyApi,
  SCROLL_RESTORATION_HREFS,
  ScrollRestorationExamplePageProp,
  ScrollRestorationLinkList
} from '@component/others/scroll-restoration';
import {useScrollRestoration} from '@util/extend/scroll-restoration';

/** Flow (Only Production)
 * 1. (△) (약간의 높이 오차있음) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨.
 * 2. (O) (내부) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 * 3. (O) (내부) 목적지에서 뒤로가기눌렀을 때 목적지의 스크롤은 유지됨.
 * 4. (D) (애매함. 도착지 페이지렌더링방식에 따라 갈릴거같음.) 앞으로가기했을 때 목적지 스크롤복원도 잘됨.
 *
 * ==> 다잘됨.
 * ==> default에서 발생하는 2,3,4문제가 해결됨.
 */

// URL: http://localhost:3000/solution/scroll-restoration/ssr
export default function Page({list}: ScrollRestorationExamplePageProp) {
  useScrollRestoration();

  return (
    <ScrollRestorationLinkList list={list}/>
  );
}

export const getServerSideProps: GetServerSideProps<ScrollRestorationExamplePageProp> = async () => {
  return {
    props: {
      list: await getScrollRestorationDummyApi(SCROLL_RESTORATION_HREFS.mySolution)
    }
  };
};
