import {NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  switch (type) {
    case 'json':
      return Response.json({
        data: 'some data'
      });

    case 'string':
      return new Response('Hello World');

    case 'json-number':
      return Response.json(1);

    case 'json-string':
      return Response.json('1');

    case 'json-null':
      return Response.json(null);

    case 'json-undefined':
      return Response.json(undefined);

    default:
      return new Response('', {
        status: 404
      })
  }
}
