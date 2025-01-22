import type {ErrorEvent, EventHint} from '@sentry/types';
import {CustomizedError} from '@/utils/service/error/both-side';

export function beforeSend(event: ErrorEvent, hint: EventHint) {
  /** TODO
   * 1. Sentry에 에러 객체 원본을 보내도록 하고,
   * 2. 개발자는 분류기준을 정해서 오류들을 분류한 후 에러클래스로 제작한다.
   * 3. 에러 클래스가 곧 그룹(태그,필터)을 의미하고, 우선순위도 의미하므로, 여기서는 에러클래스를 기준으로 event.level 같은것을 설정한다.
   * 4. 단, 같은 에러 클래스의 인스턴스라 할지라도 별도의 이벤트 설정을 하고싶을 수 있으므로 (우선순위 높임) 커스텀도 가능하게 한다.
   */
  event.extra = {
    original: hint.originalException,
  };

  if (!(hint.originalException instanceof CustomizedError)) {
    return event;
  }

  const option = hint.originalException.sentry;

  if (option?.level) {
    event.level = option.level;
  }

  return event;
}
