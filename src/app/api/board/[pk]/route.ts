import {NextRequest} from 'next/server';
import {timeoutPromise} from '@/utils/extend/random/promise';
import {PatchBoardApiRequest} from '@/types/services/board';
import database from '@/utils/service/api/database';

export async function PATCH(request: NextRequest, {params: {pk}}: {params: {pk: string}}) {
  await timeoutPromise(300);

  const body = await request.json() as PatchBoardApiRequest;
  const {list} = await database.board.get();
  await database.board.set({
    list: list.map(item => {
      if (item.pk !== Number(pk)) {
        return item;
      } else {
        return {
          ...item,
          ...body
        };
      }
    })
  });
  return new Response('');
}

export async function DELETE(_: NextRequest, {params: {pk}}: {params: {pk: string}}) {
  await timeoutPromise(300);

  const {list} = await database.board.get();
  await database.board.set({
    list: list.filter(item => item.pk !== Number(pk))
  });
  return new Response('');
}

export async function GET(_: NextRequest, {params: {pk}}: {params: {pk: string}}) {
  await timeoutPromise(300);

  const {list} = await database.board.get();
  const board = list.find(item => item.pk === Number(pk));

  if (board) {
    return Response.json(board);
  } else {
    return new Response('', {
      status: 404
    });
  }
}
