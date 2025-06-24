import {NextRequest} from 'next/server';
import dayjs from 'dayjs';
import {timeoutPromise} from '@/utils/extend/random/promise';
import {PostBoardApiRequest} from '@/types/services/board';
import database from '@/utils/service/api/database';

export async function POST(request: NextRequest) {
  await timeoutPromise(300);

  const body = await request.json() as PostBoardApiRequest[];
  const {list} = await database.board.get();
  const startPk = list.length === 0 ? 1 : list[list.length - 1].pk + 1;

  await database.board.set({
    list: list.concat(body.map(({title, type}, index) => ({
      pk: startPk + index,
      title,
      type
    })))
  });
  return new Response('');
}

export async function GET(request: NextRequest) {
  await timeoutPromise(300);
  const searchParams = request.nextUrl.searchParams;
  const filter = searchParams.get('filter');

  const {list} = await database.board.get();
  return Response.json({
    list: !filter ? list : list.filter(({type}) => type === filter as any),
    currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
  });
}

export async function DELETE(_: NextRequest) {
  await timeoutPromise(300);

  await database.board.set({
    list: []
  });

  return new Response('');
}
