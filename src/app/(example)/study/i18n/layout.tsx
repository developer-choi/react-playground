import React, {PropsWithChildren} from 'react';
import IntlClientProvider from '@/utils/service/i18n/IntlClientProvider';
import {getMessages} from 'next-intl/server';
import {getUserLocale} from '@/utils/service/i18n';
import {SessionProvider} from 'next-auth/react';
import {auth} from '@/utils/service/auth';

// 이 내용이, 실제 프로젝트에서는 service layout같은 높은 layout에 있으면 됨
export default async function Layout({children}: PropsWithChildren) {
  const [messages, locale, session] = await Promise.all([getMessages(), getUserLocale(), auth()]);

  // 로그인 한 유저 정보 안에 언어를 판단할 수 있는 값이 있는 경우를 가정하기위해 Session Provider를 같이 추가했음.
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <IntlClientProvider locale={locale.short} messages={messages}>
        {children}
      </IntlClientProvider>
    </SessionProvider>
  );
}
