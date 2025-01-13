import {customFetchOnServerSide} from '@/utils/extend/library/fetch';
import {handleServerSideError} from '@/utils/service/error/server-side';

// URL: http://localhost:3000/solution/permission/server
// Doc: [Permission Algorithm] https://docs.google.com/document/d/1Adprw6cjDQh2suSOCBuD2UuH6sIZjbyHa-w5sk9gDWs/edit?tab=t.0
export default async function Page() {
  try {
    /**
     * 1. API 호출 전에 프론트에서 걸리던가 (여기 코드수정)
     * 2. API 응답 왔는데 403이던가 (/app/permission/route.ts 코드수정)
     *
     * 둘 다 에러처리는 똑같아야함. 권한없다고 에러페이지 보여주기
     */
    await customFetchOnServerSide('/api/permission', {
      authorize: 'DASHBOARD.PAYMENT:READ',
      // authorize: 'DASHBOARD.COMMUNITY:READ',
      method: 'GET'
    });

    return (
      <div>권한 통과</div>
    );
  } catch (error) {
    return handleServerSideError(error);
  }
}
