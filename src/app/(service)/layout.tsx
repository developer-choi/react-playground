import React, {PropsWithChildren} from 'react';
import '@/utils/styles/reset.css';
import '@/utils/styles/global.css';
import InnerSessionProvider from '@/utils/service/auth/InnerSessionProvider';
import {SessionProvider} from 'next-auth/react';
import {auth} from '@/utils/service/auth';
import ServiceLayoutHeader from '@/components/layout/ServiceLayoutHeader';

export default async function ServiceLayout({children}: PropsWithChildren) {
  const session = await auth();

  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <InnerSessionProvider>
        <ServiceLayoutHeader/>
        {children}
      </InnerSessionProvider>
    </SessionProvider>
  );
}
