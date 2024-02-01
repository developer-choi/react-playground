import type {GetStaticProps} from "next";
import type {ScrollRestorationExamplePageProp} from "@component/others/scroll-restoration";
import {getScrollRestorationDummyApi, SCROLL_RESTORATION_HREFS, ScrollRestorationLinkList} from "@component/others/scroll-restoration";

/** Flow (Only Production)
 * 1. (△) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨. (약간의 높이 오차있음)
 * 2. (△) (내부) (약간의 높이 오차있음, 최초에만 잘 안되고 왔다갔다 2번 반복할 떄부터 됨.) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 * 3. (O) (내부, 아예 안보이긴함) 목적지에서 뒤로가기눌렀을 때 목적지의 스크롤은 유지 됨.
 * 4. (O) 앞으로가기했을 때 목적지 스크롤복원도 잘됨.
 *
 * ==> 별다른 문제없음.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/default/ssg
export default function Page({list}: ScrollRestorationExamplePageProp) {
  return <ScrollRestorationLinkList list={list} />;
}

export const getStaticProps: GetStaticProps<ScrollRestorationExamplePageProp> = async () => {
  return {
    props: {
      list: await getScrollRestorationDummyApi(SCROLL_RESTORATION_HREFS.default)
    }
  };
};
