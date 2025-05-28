import 'server-only';

import {LoginError} from '@/utils/service/error';
import {auth, CURRENT_URL_IN_HEADER} from '@/utils/service/auth';
import {redirect} from 'next/navigation';
import {customFetch, ExtendedCustomFetchParameter} from '@/utils/extend/library/fetch/index';
import {headers} from 'next/headers';

export async function customFetchOnServerSide<D>(input: string | URL | globalThis.Request, parameter: ExtendedCustomFetchParameter) {
  try {
    const session = parameter.authPolicy === 'none' ? null : await auth();
    return customFetch<D>(input, {...parameter, session});
  } catch (error) {
    if (error instanceof LoginError) {
      const currentUrl = headers().get(CURRENT_URL_IN_HEADER) ?? '/'; // middleware에서 셋팅
      redirect(`/api/next-auth/logout?redirect=${currentUrl}`);

    } else {
      throw error;
    }
  }
}
