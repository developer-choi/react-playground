'use client';

import { IntlConfig } from 'use-intl';
import React, { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import {handleIntlError} from '@/utils/service/i18n/handleIntlError';

// https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing
// https://next-intl-docs.vercel.app/docs/environments/server-client-components#non-serializable-props
export default function IntlClientProvider({ children, ...rest }: PropsWithChildren<IntlConfig>) {
  return (
    <NextIntlClientProvider onError={handleIntlError} {...rest}>
      {children}
    </NextIntlClientProvider>
  );
}
