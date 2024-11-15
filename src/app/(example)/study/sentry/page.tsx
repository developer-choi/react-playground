'use client';

import Button from '@/components/element/Button';
import {useCallback} from 'react';
import * as Sentry from '@sentry/nextjs';

// URL: http://localhost:3000/study/sentry
// Doc: ...
export default function Page() {
  const throwUnhandledError = useCallback(() => {
    throw new CustomClientError('UnhandledError occurred');
  }, []);

  const manuallyCaptureError = useCallback(() => {
    Sentry.captureException(new CustomClientError('manually Capture Error'));
  }, []);

  return (
    <>
      <Button onClick={throwUnhandledError}>throw Unhandled Error</Button>
      <Button onClick={manuallyCaptureError}>manually Capture Error</Button>
    </>
  );
}

class CustomClientError extends Error {
  constructor(message: string) {
    super(message);
  }
}
