import React from 'react';
import ErrorPageTemplate from '@/components/error/ErrorPageTemplate';
import {ServicePermissionDeniedError} from '@/utils/service/error/both-side';

// Doc: [Can not catch an ServerSideError on client] https://docs.google.com/document/d/1UmDWmmGTNH_XNupQ-tegMnQwzb-m5yD2Hz_NzO2glic/edit?tab=t.0
export function handleServerSideError(error: any) {
  if (error instanceof InvalidAccessError) {
    return (
      <ErrorPageTemplate title="Invalid Access" content={error.message}/>
    );
  }

  if (error instanceof ServicePermissionDeniedError) {
    return (
      <ErrorPageTemplate title="403" content={error.getMessageTemplate()}/>
    );
  }

  // Error Boundary 만나기 위함
  throw error;
}

// 회원가입 폼 페이지 안거치고 회원가입 완료페이지 간 경우
export class InvalidAccessError extends Error {
  constructor(message = '잘못된 접근입니다.') {
    super(message);
  }
}
