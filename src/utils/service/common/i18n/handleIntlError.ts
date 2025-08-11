import { IntlError } from 'next-intl';

/**
 * Client / Server 양쪽에서 onError에 전달되는 에러처리함수
 * 주로 번역되지않은 다국어코드 캐치해서 Sentry로 알림보낼 용도
 */
export function handleIntlError(error: IntlError) {
  console.log('handleIntlError() 에서 catch한 에러 : ', error);
}
