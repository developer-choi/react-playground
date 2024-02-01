import {useQuery} from "@tanstack/react-query";
import {getScrollRestorationDummyApi, SCROLL_RESTORATION_HREFS, ScrollRestorationLinkList} from "@component/others/scroll-restoration";
import {useScrollRestoration} from "@util/extend/scroll-restoration";

/** Flow (Only Production)
 * 1. (X) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨.
 * 2. (O) (내부) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 * 3. (O) (내부) 목적지에서 뒤로가기눌렀을 때 목적지의 스크롤은 유지 됨.
 * 4. (O) 앞으로가기했을 때 목적지 스크롤복원도 잘됨.
 *
 * ==> 최소조건은 만족함.
 * ==> 2번이 오차없이 뒤로가기할떄 항상 출발지 스크롤복원이 잘됨.
 */
// URL: http://localhost:3000/solution/scroll-restoration/csr-rq
export default function Page() {
  useScrollRestoration();

  const {data = []} = useQuery({
    queryKey: ["my-solution-csr"],
    queryFn: () => getScrollRestorationDummyApi(SCROLL_RESTORATION_HREFS.mySolution)
  });

  return <ScrollRestorationLinkList list={data} />;
}
