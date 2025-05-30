import 'server-only';
import {auth} from '@/utils/service/auth';
import {customFetch, ExtendedCustomFetchParameter} from '@/utils/extend/library/fetch/index';

export async function customFetchOnServerSide<D>(input: string | URL | globalThis.Request, parameter: ExtendedCustomFetchParameter) {
  const session = parameter.authPolicy === 'none' ? null : await auth();
  return await customFetch<D>(input, {...parameter, session});
}
