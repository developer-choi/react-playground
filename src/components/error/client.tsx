'use client';

import {PropsWithChildren, useCallback, useEffect} from 'react';
import {FetchError, LoginError} from '@/utils/service/error';
import {getErrorInfo} from '@/utils/service/error/info';
import * as Sentry from '@sentry/nextjs';
import {ErrorBoundary, FallbackProps} from 'react-error-boundary';
import {useLogout} from '@/utils/service/auth/hooks';
import ErrorPageTemplate from '@/components/error/ErrorPageTemplate';

// Server Side에서 children을 렌더링하다가 오류가 난 경우에도 사용이 가능.
export function CustomErrorBoundary({children}: PropsWithChildren) {
  const FallbackComponent = useCallback(({error}: FallbackProps) => {
    return <ClientErrorFallback error={error} isPage={false}/>;
  }, []);

  return <ErrorBoundary FallbackComponent={FallbackComponent}>{children}</ErrorBoundary>;
}

export interface ClientErrorFallbackProps {
  error: unknown;
  isPage: boolean; // default false, 전체 에러페이지인 error.tsx에서만 true로 전달할것
}

/** Client Side에서 렌더링 하다 오류가 발생한 경우
 * 1. error.tsx (전체 페이지 범위)
 * 2. ErrorBoundary의 fallback props (페이지 내 일부 범위)
 */
export function ClientErrorFallback({error, isPage}: ClientErrorFallbackProps) {
  const logout = useLogout();
  const {title, content} = getErrorInfo(error);

  // 에러메시지를 보여주는것 뿐만 아니라 특별히 더 처리 해야하는 로직이 있는 에러인 경우 여기서 처리
  useEffect(() => {
    if (!isPage) {
      return;
    }

    /**
     * Client Side에서 rendering 시점에 API를 호출했고, 그 API에서 401 에러가 응답된 경우, (useQuery 등)
     * 별도 UI 보이지않고 로그아웃을 시키되
     * 기본 에러처리는 실행하지않기 위해 별도 useHandleClientSideError() 같은거 쓰지않음.
     */
    if (error instanceof LoginError) {
      logout();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  /** Sentry로 보내는 에러는 여기서 별도 필터링
   * server side에서 에러가 난 경우에는 server side에서 원본 에러객체를 갖고있기 때문에, 에러를 client가 아닌 server에서 던지도록 되어있고 이 경우 Client에서 또 에러를 던질 필요가 없기 때문.
   */
  useEffect(() => {
    const ignoreSentry =
      error instanceof LoginError || (error !== null && typeof error === 'object' && 'digest' in error);

    if (ignoreSentry) {
      return;
    }

    Sentry.captureException(error);
  }, [error]);

  if (error instanceof FetchError && error.response.status === 401) {
    return null; // 아무것도 안보여주고 effect 실행시켜서 로그아웃 시키기 위함
  }

  return <ErrorPageTemplate title={title} content={content} fullScreen={isPage}/>;
}
