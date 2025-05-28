import DeleteTemporaryData from '@/components/DeleteTemporaryData';
import {handleServerSideError} from '@/utils/service/error/server';
import {getTemporaryDataApi} from '@/utils/service/api/temporary-server';

// 꼭 미로그인 상태로 접근해야함.
// URL: http://localhost:3000/guest/signup/success
// Doc: https://docs.google.com/document/d/11KFXo5bfNYhSwa9EgxIinmnHGv9dCivwipBUc0D0pFY/edit
export default async function Page() {
  try {
    const response = await getTemporaryDataApi('signUpSuccess');

    return (
      <>
        <div>{response.email}</div>
        <DeleteTemporaryData name="signUpSuccess"/>
      </>
    );
  } catch (error) {
    return handleServerSideError(error);
  }
}
