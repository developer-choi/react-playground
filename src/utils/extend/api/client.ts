'use client';

import {getSession} from 'next-auth/react';
import {getCustomFetchInBothSide, GetFetchParameter} from '@/utils/extend/api/both';

export async function getCustomFetchInClientSide(input: string | URL | globalThis.Request, parameter: Omit<GetFetchParameter, 'session'>) {
  try {
    const session = await getSession();
    return await getCustomFetchInBothSide(input, {...parameter, session});
  } catch (error: any) {
    throw error;
  }
}
