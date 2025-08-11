import {handlers} from '@/utils/service/common/auth';
import {NextRequest} from 'next/server';

/**
 * https://github.com/nextauthjs/next-auth/issues/10928#issuecomment-2144241314
 *
 * 기존에 발생했던 버그는,
 * 배포 환경 (teacher-dev.langdy-random.net) 에서 로그인 성공 후 리다이랙트 될 때 localhost:80 으로 리다이랙트 되었습니다.
 * 깃 허브 이슈 찾아보니 Reverse Proxy 환경에서 이런일이 발생한다고 하여 그중 해결된 코드를 가져왔습니다.
 */
const reqWithTrustedOrigin = (req: NextRequest): NextRequest => {
  if (process.env.AUTH_TRUST_HOST !== 'true') return req;
  const proto = req.headers.get('x-forwarded-proto');
  const host = req.headers.get('x-forwarded-host');
  if (!proto || !host) {
    console.warn('Missing x-forwarded-proto or x-forwarded-host headers.');
    return req;
  }
  const envOrigin = `${proto}://${host}`;
  const { href, origin } = req.nextUrl;
  return new NextRequest(href.replace(origin, envOrigin), req);
};

export const GET = (req: NextRequest) => {
  return handlers.GET(reqWithTrustedOrigin(req));
};

export const POST = (req: NextRequest) => {
  return handlers.POST(reqWithTrustedOrigin(req));
};
