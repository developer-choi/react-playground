import React, {PropsWithChildren} from 'react';
import '@/utils/styles/reset.css';
import '@/utils/styles/global.css';
import InnerSessionProvider from '@/utils/service/auth/InnerSessionProvider';
import {SessionProvider} from 'next-auth/react';
import {auth} from '@/utils/service/auth';
import ServiceLayoutHeader from '@/components/layout/ServiceLayoutHeader';
import {getMessages} from 'next-intl/server';
import {getUserLocale} from '@/utils/service/i18n';
import IntlClientProvider from '@/utils/service/i18n/IntlClientProvider';
import dynamic from 'next/dynamic';

const ModalProvider = dynamic(() => import('@/components/modal/ModalProvider'), {ssr: false});

/**
 * 로그인 여부와 상관없이 콜백페이지만 제외하고 모든 페이지를 감싸는 레이아웃
 * 즉, 해당 레이아웃 아래의 페이지 부터는 다국어가 적용되야 하므로 여기서 다국어를 셋팅/
 * 다국어 셋팅 출처 : https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing
 */
export default async function ServiceLayout({children}: PropsWithChildren) {
  const [messages, locale, session] = await Promise.all([getMessages(), getUserLocale(), auth()]);

  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <InnerSessionProvider>
        <IntlClientProvider locale={locale.short} messages={messages}>
          <ServiceLayoutHeader/>
          <ModalProvider>
            {children}
          </ModalProvider>
        </IntlClientProvider>
      </InnerSessionProvider>
    </SessionProvider>
  );
}
