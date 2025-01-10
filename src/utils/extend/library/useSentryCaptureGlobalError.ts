import {useEffect} from 'react';
import * as Sentry from '@sentry/nextjs';
import {ErrorPageProps} from '@/types/declaration/next';

// https://docs.google.com/document/d/1TORw5hWSoWYiRhd6kg4D8tQ7pVsBQFOvPxavffrb4l0/edit?usp=sharing
export default function useSentryCaptureGlobalError(error: ErrorPageProps['error']) {
  useEffect(() => {
    /**
     * Server Side에서 에러가 발생해도 Sentry로 에러가 가게되는데, 굳이 또 Client Side에서 에러가 Sentry로 가지 않도록 하기위함.
     * 이거 안하면 Server Side 에러 1회에 Sentry 2개씩 에러 전송됨
     * 그 조건이 digest인 이유는 https://nextjs.org/docs/app/api-reference/file-conventions/error#errordigest
     */
    if (!error.digest) {
      Sentry.captureException(error);
    }
  }, [error]);
}
