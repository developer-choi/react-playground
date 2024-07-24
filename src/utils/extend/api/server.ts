import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {auth, CURRENT_URL_IN_HEADER} from '@/utils/service/auth';
import {LoginError} from '@/utils/service/auth/redirect';
import {customFetchInBothSide, ExtendedCustomFetchParameter} from '@/utils/extend/api/both';

export async function customFetchInServerSide(input: string | URL | globalThis.Request, parameter: ExtendedCustomFetchParameter) {
  try {
    const session = await auth();
    return await customFetchInBothSide(input, {...parameter, session});
  } catch (error: any) {
    if (error instanceof LoginError) {
      const currentUrl = headers().get(CURRENT_URL_IN_HEADER) ?? '/'; // middleware에서 셋팅
      redirect(`/api/next-auth/logout?redirect=${currentUrl}`);

    } else {
      throw error;
    }
  }
}
