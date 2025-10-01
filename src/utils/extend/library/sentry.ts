import type {ClientOptions, ErrorEvent, EventHint} from '@sentry/types';
import {BaseError} from '@forworkchoe/core/utils';

export const beforeSend: ClientOptions['beforeSend'] = (event: ErrorEvent, hint: EventHint) => {
  if (isSkipSentry(hint)) {
    return null;
  }

  if (!event.extra) {
    event.extra = {};
  }

  if (hint.originalException instanceof Error) {
    // 외부에서 던져진 에러 (스크립트 불러오기 실패) 같은것도 Sentry로 모두 보내기 위함
    event.extra.stack = hint.originalException.stack;
  }

  event.extra.original = hint.originalException;

  if (!(hint.originalException instanceof BaseError)) {
    return event;
  }

  const {sentryOptions, platform} = hint.originalException;
  event.level = sentryOptions.level;
  event.tags = sentryOptions.tags;

  if (event.contexts) {
    event.contexts.custom = {
      platform,
    };
  }

  return event;
};

function isSkipSentry(hint: EventHint): boolean {
  const {originalException} = hint;

  if (!(originalException instanceof Error)) {
    return false;
  }

  // nextjs에서 server side에서 redirect() 하면 내부적으로 이 에러를 던져서 처리하도록 되어있는데 문제는 그게 Sentry까지 날아간다는 것이었음. 이거말고 다른 해결책을 못찾음.
  const isNextRedirectError = hint.originalException && typeof hint.originalException === 'object' && 'digest' in hint.originalException && typeof hint.originalException.digest === 'string' && hint.originalException.digest.includes('NEXT_REDIRECT');

  if (isNextRedirectError) {
    return true;
  }

  return SKIP_CONDITIONS.some((condition) => {
    const isClassMatch = originalException instanceof condition.class;
    const isKeywordMatch = originalException.message.includes(condition.keyword);
    const isStackPathMatch = !condition.stackPath ||
      (originalException.stack && originalException.stack.includes(condition.stackPath));

    return isClassMatch && isKeywordMatch && isStackPathMatch;
  });
}

type ErrorConstructor = new (...args: any[]) => Error;

interface SkipCondition {
  class: ErrorConstructor;
  keyword: string;
  stackPath?: string;
}

const SKIP_CONDITIONS: SkipCondition[] = [
  {
    class: ReferenceError,
    keyword: 'Can\'t find variable',
    stackPath: '/external/some.js',
  },
];
