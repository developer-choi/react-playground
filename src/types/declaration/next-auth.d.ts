import {DefaultSession, Session} from "next-auth";
import {NextRequest} from "next/server";

export declare module 'next-auth' {
  interface User {
    member_id: number;
    access_token: string;
    grantedPermissions: string; // Permission들이 comma로 연결됨 (쿠키에는 배열이 저장이 안됨)
    // email: string;
    // name: string;
    // id: string;
    // image: string;
  }

  // auth()의 return type에 씀.
  interface Session extends DefaultSession {
    user: User;
  }
}

export declare module 'next-auth' {
  interface NextAuthRequest extends NextRequest {
    auth: Session | null;
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    user: User;
  }
}
