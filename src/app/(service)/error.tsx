'use client';

import {ClientErrorFallback} from '@/components/error/client';
import {ErrorPageProps} from '@forworkchoe/core/utils';

export default function ErrorPage({error, reset}: ErrorPageProps) {
  return <ClientErrorFallback error={error} onReset={reset} isPage/>;
}
