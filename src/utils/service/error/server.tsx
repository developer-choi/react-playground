import {CustomizedError, FetchError} from '@/utils/service/error/index';
import {notFound} from 'next/navigation';
import {PageServerComponentProps} from '@/types/declaration/next';
import {validateComputableNumber} from '@/utils/extend/browser/query-string/validate';
import * as Sentry from '@sentry/nextjs';
import {getErrorInfo} from '@/utils/service/error/info';
import ErrorPageTemplate from '@/components/error/ErrorPageTemplate';

// Doc: [Can not catch an ServerSideError on client] https://docs.google.com/document/d/1UmDWmmGTNH_XNupQ-tegMnQwzb-m5yD2Hz_NzO2glic/edit?tab=t.0
export function handleServerSideError(error: unknown) {
  console.error(error);

  const { title, content } = getErrorInfo(error);

  if (error instanceof FetchError) {
    switch (error.response.status) {
      case 403:
        return <ErrorPageTemplate title={title} content={content} fullScreen={false} />;

      case 404:
        notFound();
    }
  }

  Sentry.captureException(error);
  return <ErrorPageTemplate title={title} content={content} fullScreen={false} />;
}

export function validateViewPageIdParams(id: PageServerComponentProps['params']['any']) {
  const result = validateComputableNumber(id, {required: true, throwable: false});

  if (!result) {
    notFound();
  }

  return result;
}

// 회원가입 폼 페이지 안거치고 회원가입 완료페이지 간 경우
export class InvalidAccessError extends CustomizedError {
  readonly name = 'InvalidAccessError';

  constructor(message = '잘못된 접근입니다.') {
    super(message);
  }
}
