import {NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keys = searchParams.keys();

  try {
    // Object.fromEntries(searchParams.entries()) 이거로 가져오려고 하면 array는 젤 끝에 요소 하나만 남아서 이렇게 직접 뽑음.
    return Response.json(Object.fromEntries(Array.from(keys).map(key => [key, searchParams.getAll(key)])));
  } catch (error) {
    return new Response('', {
      status: 500
    });
  }
}
