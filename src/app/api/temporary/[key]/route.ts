import {NextRequest, NextResponse} from 'next/server';

/**
 * POST /temporary/[key]
 * Request Body = 아무거나 (Body에 있는 값을 그대로 쿠키에 저장, 객체면 객체, 문자열이면 문자열 그대로)
 * Response 200
 */
export async function POST(request: NextRequest, {params: {key}}: {params: {key: string}}) {
  try {
    const contentType = request.headers.get('Content-Type');
    let value;

    if (contentType === 'application/json') {
      value = await request.json();

    } else {
      value = await request.text();
    }

    const response = new NextResponse();

    response.cookies.set(key, typeof value === 'string' ? value : JSON.stringify(value), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return response;
  } catch (error: any) {
    return new Response(error.message, {
      status: 500
    });
  }
}

/**
 * GET /temporary/[key]
 * Response 200 객체 저장했었으면 객체, 문자열 저장했었으면 문자열
 * Response 404 저장한게 없는 경우
 */
export async function GET(request: NextRequest, {params: {key}}: {params: {key: string}}) {
  const cookie = request.cookies.get(key);
  const value = !cookie ? null : cookie.value;

  if (!value) {
    return new Response('', {
      status: 404
    });
  }

  let response;

  try {
    response = NextResponse.json(JSON.parse(value));
  } catch (error) {
    response = new NextResponse(value);
  }

  return response;
}

export async function DELETE(_: NextRequest, {params: {key}}: {params: {key: string}}) {
  const response = new NextResponse('');
  response.cookies.delete(key);
  return response;
}
