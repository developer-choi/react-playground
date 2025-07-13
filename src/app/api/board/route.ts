import {NextRequest, NextResponse} from 'next/server';
import dayjs from 'dayjs';
import {timeoutPromise} from '@/utils/extend/random/promise';
import {BoardListApiResponse, PostBoardApiRequest} from '@/types/services/board';
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
  await timeoutPromise(1000);

  // 1. 쿼리 파라미터에서 page와 limit 값을 가져옵니다.
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 1000);
  const filter = searchParams.get('filter');

  // 전체 데이터를 가져옵니다. (DBMS가 아니므로 전체를 로드)
  const {list: originalList} = await database.board.get();

  // 2. 필터링을 먼저 적용합니다.
  const filteredList = !filter
    ? originalList
    : originalList.filter(({type}) => type === filter);

  // 3. 필터링된 리스트를 기준으로 페이지네이션 계산을 합니다.
  const total = filteredList.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // 4. 계산된 범위만큼 데이터를 자릅니다.
  const paginatedList = filteredList.slice(startIndex, endIndex);

  // 5. 새로운 API 응답 형식에 맞춰 데이터를 구성합니다.
  const response: BoardListApiResponse = {
    list: paginatedList,
    total,
    currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  return NextResponse.json(response);
}

export async function DELETE(_: NextRequest) {
  await timeoutPromise(300);

  await database.board.set({
    list: []
  });

  return new Response('');
}
