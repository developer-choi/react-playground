import React, {PropsWithChildren} from 'react';
import '@/utils/styles/reset.css';
import '@/utils/styles/global.css';
import {SessionProvider} from 'next-auth/react';
import {auth} from '@/utils/service/auth';

export default async function ServiceLayout({children}: PropsWithChildren) {
  const session = await auth();

  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      {children}
    </SessionProvider>
  );
}
