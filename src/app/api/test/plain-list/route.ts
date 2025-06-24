import {NextRequest} from 'next/server';
import {timeoutPromise} from '@/utils/extend/random/promise';
import {PlainListApiResponse} from '@/types/services/dummy';
import {range} from '@/utils/extend/data-type/number';

export async function GET(request: NextRequest) {
  await timeoutPromise(500);

  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page') ?? '1');

  const response: PlainListApiResponse = {
    list: range((page - 1) * LIMIT + 1, LIMIT * page).map(value => ({
      pk: value,
      title: `${value}번 제목`
    }))
  };

  return Response.json(response);
}

const LIMIT = 20;
