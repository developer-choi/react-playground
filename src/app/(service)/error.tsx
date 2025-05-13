'use client';

import {CustomizedErrorPage, InternalServerErrorPage} from '@/components/error/ErrorPageTemplate';
import {ErrorPageProps} from '@/types/declaration/next';
import useSentryCaptureGlobalError from '@/utils/extend/library/useSentryCaptureGlobalError';
import {CustomizedError} from '@/utils/service/error';

// 서비스에 대한 대부분의 에러는 이 페이지가 보임.
export default function ErrorPage({error}: ErrorPageProps) {
  useSentryCaptureGlobalError(error);

  // 참고 > server side에서 던져진 에러는 Error로 나옴.
  if (error instanceof CustomizedError) {
    return (
      <CustomizedErrorPage error={error}/>
    );
  }

  return (
    <InternalServerErrorPage/>
  );
}
