'use client';

import React, {useCallback, useEffect, useState} from 'react';
import * as Sentry from '@sentry/nextjs';
import Button from '@/components/element/Button';
import {useHandleClientSideError} from '@/utils/service/error/client-side';
import {customFetchOnClientSide} from '@/utils/extend/library/fetch';
import {ServicePermissionDeniedError} from '@/utils/service/error/both-side';

// URL: http://localhost:3000/staging/error
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

  const [effectErrorOccurred, setEffectErrorOccurred] = useState(false);
  useEffect(() => {
    if (effectErrorOccurred) {
      setTimeout(() => {
        Sentry.captureException(new CustomClientError('[effect] manually Capture error'));
      });

      throw new CustomClientError('[effect] UnhandledError occurred');
    }
  }, [effectErrorOccurred]);

  const throwEffectError = useCallback(() => {
    setEffectErrorOccurred(true);
  }, []);

  const handleClientSideError = useHandleClientSideError();
  const throwUnexpectedError = useCallback(() => {
    handleClientSideError(new Error('unexpected'));
  }, [handleClientSideError]);

  const throwPermissionError = useCallback(async () => {
    try {
      await customFetchOnClientSide('/api/test/plain-list', {
        method: 'GET',

        /** 테스트 케이스
         * 1. 로그인 안하고 시도 (로그인 하라는 모달 떠야함)
         * 2. 없는 권한을 가지고 요청 (권한없다는 모달 뜸)
         * 3. 권한 있는 상태로 요청 > 성공
         */
        authorize: 'DASHBOARD.COMMUNITY:READ',
      })
    } catch (error) {
      handleClientSideError(error);
    }
  }, [handleClientSideError]);

  if (renderingErrorOccurred) {
    throw new ServicePermissionDeniedError('DASHBOARD.COMMUNITY:CREATE', ['DASHBOARD.PAYMENT:READ']);
  }

  return (
    <>
      <Button onClick={throwRenderingError}>throw Rendering Error</Button>
      <Button onClick={throwEffectError}>throw Effect Error</Button>
      <Button onClick={throwUnexpectedError}>throw unexpected Error</Button>
      <Button onClick={throwUnhandledError}>throw Unhandled Error</Button>
      <Button onClick={manuallyCaptureError}>manually Capture Error</Button>
      <Button onClick={throwPermissionError}>throw PermissionError</Button>
    </>
  );
}

class CustomClientError extends Error {
  readonly name = 'CustomClientError';
  readonly someCustomData = 'Some Custom Data';

  constructor(message: string) {
    super(message);
  }
}
