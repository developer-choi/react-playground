import DeleteTemporaryData from '@/components/DeleteTemporaryData';
import {getTemporaryDataApi} from '@/utils/service/api/temporary';

// URL: http://localhost:3000/guest/signup/success
// Doc: https://docs.google.com/document/d/11KFXo5bfNYhSwa9EgxIinmnHGv9dCivwipBUc0D0pFY/edit
export default async function Page() {
  try {
    const response = await getTemporaryDataApi('signUpSuccess');

    return (
      <>
        <div>{response.name}</div>
        <DeleteTemporaryData name="signUpSuccess"/>
      </>
    );
  } catch (error: any) {
    if (error.status === 404) {
      console.log(error.status);
      return <div>잘못된 접근임 ㅅㄱ</div>;
    } else {
      throw error;
    }
  }
}
