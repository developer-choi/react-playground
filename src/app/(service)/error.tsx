'use client';

import {ClientErrorFallback} from '@/components/error/client';
import {ErrorPageProps} from '@/types/declaration/next';

export default function ErrorPage({error, reset}: ErrorPageProps) {
  return <ClientErrorFallback error={error} onReset={reset} isPage/>;
}
