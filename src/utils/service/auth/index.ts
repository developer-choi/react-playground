import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {getNextNavigating} from '@/utils/service/auth/path';
import {NextResponse} from 'next/server';

/**
 * [Next Auth Overview] https://docs.google.com/document/d/1PYKKPneIYB8j8vz8fQgqwBLAkEmB69KJfeFTSXhtdbk/edit#heading=h.mkk12las5ndq
 * [Next Auth auth.ts] https://docs.google.com/document/d/1w0Kn91aacGsdKFPTxsdM3JsyRzKynTR4kgJzyS3rcbY/edit#heading=h.14tqv65n973
 */
export const {handlers, signOut, auth} = NextAuth({
  pages: {
    signIn: '/guest/login',
    error: '/guest/login'
  },
  session: {
    maxAge: 60 * 60 * 24 // 단위 : second
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const {email, access_token, name, member_id} = credentials;
        return {
          email: email as string,
          access_token: access_token as string,
          name: name as string,
          member_id: member_id as number,
        };
      },
    })
  ],
  callbacks: {
    jwt: async ({token, user, trigger}) => {
      if (trigger === 'signIn') {
        token.user = user;
      }

      return token;
    },
    session: async ({session, token}) => {
      session.user = token.user;
      return session;
    },
    authorized({auth, request: {headers, nextUrl, url}}) {
      const isLoggedIn = !!auth?.user;

      const nextNavigating = getNextNavigating({
        nextPathname: nextUrl.pathname,
        isLoggedIn,
        redirectUrl: nextUrl.pathname + nextUrl.search
      });

      switch (nextNavigating.type) {
        case 'already-authenticated':
        case 'not-authenticated':
          return NextResponse.redirect(new URL(nextNavigating.nextUrl, url));
        default: {
          // https://www.propelauth.com/post/getting-url-in-next-server-components
          const newHeaders = new Headers(headers);
          newHeaders.set(CURRENT_URL_IN_HEADER, nextUrl.pathname + nextUrl.search);
          return NextResponse.next({headers: newHeaders});
        }
      }
    },
  },
});

export const CURRENT_URL_IN_HEADER = 'current-pathname-with-search';
