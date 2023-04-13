import {useQuery} from '@tanstack/react-query';
import {getScrollRestorationDummyApi, ScrollRestorationLinkList} from '@pages/study/next/scroll-restoration/target';

/** Flow (Only Production)
 * 1. (X) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨. (약간의 높이 오차있음)
 *
 * 2. (O) (외부) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 * 3. (△) (내부) (약간의 높이 오차있음) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨.
 *
 * 4. (O) (내부) 목적지에서 뒤로가기눌렀을 때 목적지의 스크롤은 유지 됨.
 *
 * ==> 최소조건은 만족함.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/default/csr-rq
export default function Page() {
  const {data = []} = useQuery({
    queryKey: ['default-csr-rq'],
    queryFn: getScrollRestorationDummyApi
  });

  return (
    <ScrollRestorationLinkList list={data}/>
  );
}
