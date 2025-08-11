import {ErrorPageTemplateProps} from '@/components/error/ErrorPageTemplate';
import {isObject} from '@/utils/extend/data-type/object';
import {FetchError} from '@/utils/service/common/error/class/fetch';
import {InvalidAccessError} from '@/utils/service/common/error/class/server';

/** 설계 의도
 * 1. client side에서 에러가 발생했건
 * 2. server side에서 에러가 발생했건 간에
 * ==> 에러가 같다면, 제목, 내용도 같다.
 *
 * 하지만 처리 방법은, 어디서 발생했는지에 따라 약간 다를 수 있으므로,
 * 3. client side에서 발생했다면, ClientErrorFallback 컴포넌트에서 특별한 로직을 실행하고,
 * 4. server side에서 발생했다면, handleServerSideError() 에서 특별한 로직을 실행한다.
 */
export function getErrorInfo(error: unknown): Pick<ErrorPageTemplateProps, 'title' | 'content'> {
  if (!isObject(error)) {
    throw error;
  }

  if (error instanceof FetchError) {
    switch (error.response.status) {
      case 403:
        return {
          title: '권한이 없으니',
          content: `관리자한테 ${error.apiErrorInfo?.params?.permission} 달라고 해라`,
        };
    }

    if (error.response.status.toString().startsWith('5')) {
      return {
        title: `서버 에러 (${error.response.status})`,
        content: `현재 서버에 에러가 발생했다.`,
      };
    }
  }

  if(error instanceof InvalidAccessError) {
    return {
      title: 'Invalid Access',
      content: error.message
    };
  }

  return DEFAULT;
}

const DEFAULT = {
  title: '알 수 없는 에러가 발생했다',
  content: '반복되면 고객센터 연락해라',
};
