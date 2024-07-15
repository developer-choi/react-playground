import {getCustomFetchInBothSide, GetFetchParameter} from "@/utils/extend/api/both";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {auth, CURRENT_URL_IN_HEADER} from '@/utils/service/auth';
import {LoginError} from '@/utils/service/auth/redirect';

export async function getCustomFetchInServerSide(input: string | URL | globalThis.Request, parameter: Omit<GetFetchParameter, 'session'>) {
  try {
    const session = await auth();
    return await getCustomFetchInBothSide(input, {...parameter, session});
  } catch (error: any) {
    if (error instanceof LoginError) {
      const currentUrl = headers().get(CURRENT_URL_IN_HEADER) ?? '/'; // middleware에서 셋팅
      redirect(`/api/next-auth/logout?redirect=${currentUrl}`);

    } else {
      throw error;
    }
  }
}
