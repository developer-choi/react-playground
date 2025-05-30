import {notFound, redirect} from 'next/navigation';
import {PageServerComponentProps} from '@/types/declaration/next';
import {validateComputableNumber} from '@/utils/extend/browser/query-string/validate';
import * as Sentry from '@sentry/nextjs';
import {getErrorInfo} from '@/utils/service/error/info';
import ErrorPageTemplate from '@/components/error/ErrorPageTemplate';
import {isObject} from '@/utils/extend/data-type/object';
import {headers} from 'next/headers';
import {CURRENT_URL_IN_HEADER} from '@/utils/service/auth';
import {LoginError} from '@/utils/service/error/class/auth';
import {FetchError} from '@/utils/service/error/class/fetch';

// Doc: [Can not catch an ServerSideError on client] https://docs.google.com/document/d/1UmDWmmGTNH_XNupQ-tegMnQwzb-m5yD2Hz_NzO2glic/edit?tab=t.0
export function handleServerSideError(error: unknown) {
  console.error(error);

  if (!isObject(error)) {
    throw error;
  }

  /**
   * catch 로직은 가급적 실행하는 곳과 가까운 곳에서 처리하는것이 좋기 때문에...
   * 원래는 customFetchOnServerSide()에서 처리를 하고싶었으나,
   * redirect()는 try문 안에서 실행할 수 없다보니 부득이하게 여기서 처리
   * + 대신, customFetchOnClientSide() 에서 발생한 에러는 useHandleClientSideError()가 아닌 customFetchOnClientSide() 에서 처리했음.
   */
  if (error instanceof LoginError) {
    const currentUrl = headers().get(CURRENT_URL_IN_HEADER) ?? '/'; // middleware에서 셋팅
    redirect(`/api/next-auth/logout?redirect=${currentUrl}`);
  }

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
