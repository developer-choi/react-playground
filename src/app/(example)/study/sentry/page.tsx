'use client';

import React, {useCallback, useState} from 'react';
import * as Sentry from '@sentry/nextjs';
import Button from '@/components/element/Button';

// URL: http://localhost:3000/study/sentry
// Doc: https://docs.google.com/document/d/1TORw5hWSoWYiRhd6kg4D8tQ7pVsBQFOvPxavffrb4l0/edit?tab=t.0#heading=h.o3s6i3qc1fqj
export default function Page() {
  const [renderingErrorOccurred, setRenderingErrorOccurred] = useState(false);

  const throwRenderingError = useCallback(() => {
    setRenderingErrorOccurred(true);
  }, []);

  const throwUnhandledError = useCallback(() => {
    throw new CustomClientError('UnhandledError occurred');
  }, []);

  const manuallyCaptureError = useCallback(() => {
    Sentry.captureException(new CustomClientError('manually Capture Error'));
  }, []);

  if (renderingErrorOccurred) {
    throw new CustomClientError('Some rendering error occurred');
  }

  return (
    <>
      <Button onClick={throwRenderingError}>throw Rendering Error</Button>
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
