import {NextRequest} from "next/server";
import {redirect} from "next/navigation";
import {signOut} from '@/utils/service/auth';

// Server Component에서 로그아웃 하기위한 Route Handler
export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.searchParams.get("redirect") ?? '/';

  await signOut({
    redirect: false
  });

  redirect(`/guest/login?redirect=${encodeURIComponent(redirectUrl)}`)
}
