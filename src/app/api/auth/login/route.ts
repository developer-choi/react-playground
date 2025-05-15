import {NextRequest} from 'next/server';
import {
  FailLoginCode,
  LoginApiRequest,
  LoginApiResponse,
  SuccessLoginCode
} from '@/types/services/auth';
import {timeoutPromise} from '@/utils/extend/test/promise';

export async function POST(request: NextRequest) {
  const {email} = await request.json() as LoginApiRequest;
  await timeoutPromise(200);

  if(email !== 'email@domain.com') {
    return Response.json({
      code: FAIL_LOGIN_CODE.NOT_FOUND
    }, {
      status: 400 // 이 에러코드가 맞는지는 모르겠음
    });
  }

  try {
    const response: LoginApiResponse = {
      member_id: 1,
      email,
      name: 'somename',
      access_token: '[access_token_value]',
      code: SUCCESS_LOGIN_CODE.SUCCESS,
    };

    return Response.json(response);
  } catch (error) {
    return new Response('', {
      status: 500
    });
  }
}

const SUCCESS_LOGIN_CODE: Record<SuccessLoginCode, SuccessLoginCode> = {
  EXPIRED: 'EXPIRED',
  SUCCESS: 'SUCCESS',
};

const FAIL_LOGIN_CODE: Record<FailLoginCode, FailLoginCode> = {
  NOT_FOUND: 'NOT_FOUND',
  WITHDRAWAL: 'WITHDRAWAL'
};
