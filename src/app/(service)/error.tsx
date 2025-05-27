'use client';

import {ClientErrorFallback} from '@/components/error/client';
import {ErrorPageProps} from '@/types/declaration/next';

export default function ErrorPage({error}: ErrorPageProps) {
  return <ClientErrorFallback error={error} isPage/>;
}
