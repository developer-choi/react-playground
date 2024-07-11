import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
        }
      },
    })
  ],
  callbacks: {
    jwt: async ({ token, user,  trigger}) => {
      if(trigger === "signIn") {
        token.user = user;
      }

      return token;
    },
    session: async ({session, token}) => {
      session.user = token.user;
      return session;
    },
  },
});
