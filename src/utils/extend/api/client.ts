'use client';

import {getSession, signOut} from "next-auth/react";
import {getCustomFetchInBothSide, GetFetchParameter} from "@/utils/extend/api/both";
import {LoginError} from '@/utils/service/auth/redirect';

export async function getCustomFetchInClientSide(input: string | URL | globalThis.Request, parameter: Omit<GetFetchParameter, 'session'>) {
  try {
    const session = await getSession();
    return await getCustomFetchInBothSide(input, {...parameter, session});
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
