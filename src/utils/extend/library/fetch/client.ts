import {isServer} from '@/utils/extend/library/next';
import {InvalidDevelopPolicyError, LoginError} from '@/utils/service/error';
import {getSession, signOut} from 'next-auth/react';
import {customFetch, ExtendedCustomFetchParameter} from '@/utils/extend/library/fetch/index';

export async function customFetchOnClientSide<D>(input: string | URL | globalThis.Request, parameter: ExtendedCustomFetchParameter) {
  if(isServer()) {
    throw new InvalidDevelopPolicyError('customFetchOnClientSide()는 Server Side에서 호출되면 안됩니다.');
  }

  try {
    const session = parameter.authorize === 'none' ? null : await getSession();
    return customFetch<D>(input, {...parameter, session});
  } catch (error: any) {
    if (error instanceof LoginError) {
      const redirectUrl = location.pathname + location.search;

      await signOut({
        redirect: false
      });

      throw new LoginError("Login is required", `/guest/login?redirect=${encodeURIComponent(redirectUrl)}`);
    } else {
      throw error;
    }
  }
}