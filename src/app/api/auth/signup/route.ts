import {NextRequest} from 'next/server';
import {SignUpApiRequest, SignUpApiResponse} from '@/types/services/auth';

export async function POST(request: NextRequest) {
  const body = await request.json() as SignUpApiRequest;

  if(body.email === 'email@domain.com') {
    const code: SignUpApiResponse['code'] = 'ALREADY_EMAIL_EXISTED';

    return Response.json({
      code
    }, {
      status: 400
    });
  }

  try {
    return new Response('');
  } catch (error) {
    return new Response('', {
      status: 500
    });
  }
}
