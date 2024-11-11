import React, {PropsWithChildren} from 'react';
import {auth} from '@/utils/service/auth';
import {SessionProvider} from 'next-auth/react';
import dynamic from 'next/dynamic';
import IntlClientProvider from '@/components/setting/IntlClientProvider';
import {getMessages} from 'next-intl/server';
import {getUserLocale} from '@/utils/service/i18n';
import ReactQueryProvider from '@/components/setting/ReactQueryProvider';

// 첫 페이지 로딩 시점에 안보여도 되는 것들은 모두 dynamic import 하기로 함
const ExtendedToastContainer = dynamic(() => import('@/components/setting/ExtendedToastContainer'), {ssr: false});
const ModalProvider = dynamic(() => import('@/components/setting/ModalProvider'), {ssr: false});

/**
 * 로그인 여부와 상관없이 콜백페이지만 제외하고 모든 페이지를 감싸는 레이아웃
 * 즉, 해당 레이아웃 아래의 페이지 부터는 다국어가 적용되야 하므로 여기서 다국어를 셋팅 하는게 맞음.
 */
export default async function AppProvider({children}: PropsWithChildren) {
  const [messages, locale, session] = await Promise.all([getMessages(), getUserLocale(), auth()]);

  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <IntlClientProvider locale={locale.short} messages={messages}>
        <ReactQueryProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ReactQueryProvider>
      </IntlClientProvider>
      <ExtendedToastContainer/>
    </SessionProvider>
  );
}
