import {getCustomFetchInBothSide, GetFetchParameter} from '@/utils/extend/api/both';
import {auth} from '@/utils/service/auth';

export async function getCustomFetchInServerSide(input: string | URL | globalThis.Request, parameter: Omit<GetFetchParameter, 'session'>) {
  try {
    const session = await auth();
    return await getCustomFetchInBothSide(input, {...parameter, session});
  } catch (error: any) {
    throw error;
  }
}
