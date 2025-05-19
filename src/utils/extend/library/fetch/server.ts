import 'server-only';

import {LoginError} from '@/utils/service/error';
import {auth} from '@/utils/service/auth';
import {redirect} from 'next/navigation';
import {customFetch, ExtendedCustomFetchParameter} from '@/utils/extend/library/fetch/index';
import {headers} from 'next/headers';

export async function customFetchOnServerSide<D>(input: string | URL | globalThis.Request, parameter: ExtendedCustomFetchParameter) {
  try {
    const session = parameter.authPolicy === 'none' ? null : await auth();
    return customFetch<D>(input, {...parameter, session});
  } catch (error: any) {
    if (error instanceof LoginError) {
      const currentUrl = headers().get('current-pathname-with-search') ?? '/'; // middleware에서 셋팅
      redirect(`/api/next-auth/logout?redirect=${currentUrl}`);

    } else {
      throw error;
    }
  }
}
