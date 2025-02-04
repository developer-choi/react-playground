import React from 'react';
import {CustomizedError, FetchError} from '@/utils/service/error/both-side';
import {CustomizedErrorPage} from '@/components/error/ErrorPageTemplate';
import {notFound} from 'next/navigation';

// Doc: [Can not catch an ServerSideError on client] https://docs.google.com/document/d/1UmDWmmGTNH_XNupQ-tegMnQwzb-m5yD2Hz_NzO2glic/edit?tab=t.0
export function handleServerSideError(error: any) {
  if (error instanceof FetchError && error.response.status === 404) {
    notFound();
  }

  if (error instanceof CustomizedError) {
    return (
      <CustomizedErrorPage error={error}/>
    );
  }

  /**
   * 1. Error Boundary를 만나서 에러페이지가 보이기 위함.
   * 2. Server Side에서 Sentry가 울리기 위함.
   */
  throw error;
}

// 회원가입 폼 페이지 안거치고 회원가입 완료페이지 간 경우
export class InvalidAccessError extends CustomizedError {
  readonly name = 'InvalidAccessError';

  constructor(message = '잘못된 접근입니다.') {
    super(message);
  }
}
