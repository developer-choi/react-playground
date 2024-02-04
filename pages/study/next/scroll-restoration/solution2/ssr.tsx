import type {GetServerSideProps} from 'next';
import {useScrollRestorationSolution2} from '@util/extend/legacy/legacy-scroll-restoration2';
import {
  getScrollRestorationDummyApi,
  SCROLL_RESTORATION_HREFS,
  ScrollRestorationExamplePageProp,
  ScrollRestorationLinkList
} from '@component/others/scroll-restoration';

/** Flow (Only Production)
 * 1. 새로고침했을 때 Layout Shift때문에 너무 보기흉함.
 * 2. 링크타고 들어갔다가 뒤로가기했을때도 Layout Shift때문에 너무 보기흉함.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/solution2/ssr
export default function Page({list}: ScrollRestorationExamplePageProp) {
  useScrollRestorationSolution2();

  return (
    <ScrollRestorationLinkList list={list}/>
  );
}

export const getServerSideProps: GetServerSideProps<ScrollRestorationExamplePageProp> = async () => {
  return {
    props: {
      list: await getScrollRestorationDummyApi(SCROLL_RESTORATION_HREFS.solution2)
    }
  };
};
