import {NextRequest} from 'next/server';
import {UserFieldCountApiRequest} from '@/utils/service/common/api/user';
import {timeoutPromise} from '@/utils/extend/random/promise';

export async function GET(request: NextRequest) {
  await timeoutPromise(500);

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') as UserFieldCountApiRequest['type'] | null;
  const value = searchParams.get('value');

  if(type === null || value === null) {
    return Response.json({
      status: 400,
      message: 'Request 잘못날림'
    });
  }

  try {
    return  Response.json({
      count: db[type].includes(value) ? 1 : 0
    });
  } catch (error) {
    return new Response('', {
      status: 500
    });
  }
}

const db: Record<UserFieldCountApiRequest['type'], string[]> = {
  email: [
    'random@random.com',
    'test3@random.com',
    'test5@random.com',
  ],
  nick_name: [
    '홍길동'
  ]
};
