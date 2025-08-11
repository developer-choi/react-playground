import {getBoardListApi} from '@/utils/service/common/api/board-client';
import SamePageRefreshClientList from '@/components/test/SamePageRefreshClientList';

export const revalidate = 0;

/**
 * URL: http://localhost:3000/staging/list/refresh/same-page
 * Doc: https://docs.google.com/document/d/1ir7P3J1WbsIrqa2vNQ1Co39QYmkV4ef6MHcluH6m90s/edit?tab=t.0
 *
 * 한 페이지를 벗어나지 않으면서 데이터의 최신화가 발생해야하는 페이지 예시
 * POST / UPDATE / DELETE 버튼 누르면 화면이 최신화됨.
 */
export default async function Page() {
  const {list} = await getBoardListApi();

  return (
    <SamePageRefreshClientList list={list}/>
  );
}
