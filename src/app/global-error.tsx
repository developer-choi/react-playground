'use client';

import ErrorPageTemplate from '@/components/error/ErrorPageTemplate';
import {ErrorPageProps} from '@/types/declaration/next';
import useSentryCaptureGlobalError from '@/utils/extend/library/useSentryCaptureGlobalError';

/**
 * Doc: https://docs.google.com/document/d/1ivBWX3Oxl8T0xh3kcKxCTsvhDQz6Kt-uHKR-9AO-hxU/edit?tab=t.0
 * (service)/error.tsx와 달리 최소한의 (전역) 코드만 작성. global-error에서 또 에러가 나면 안되니까.
 *
 * 1. root layout
 * 2. (service)/layout와 (service) 폴더를 제외한 나머지 페이지 (callback 페이지 등)에서 오류가 발생했을 때
 * 노출되는 (= 극히 드물게 보임) 에러페이지
 */
export default function ErrorPage({error}: ErrorPageProps) {
  useSentryCaptureGlobalError(error);

  // https://nextjs.org/docs/14/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
  // global-error.js is only enabled in production. In development, our error overlay will show instead.
  return (
    <html>
    <body>
    <ErrorPageTemplate title="Internal Server Error" content="새로고침해보세요, 지속되면 관리자 문의 해주세요"/>
    </body>
    </html>
  );
}
