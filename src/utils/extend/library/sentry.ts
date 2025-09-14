import type {ClientOptions, ErrorEvent, EventHint} from '@sentry/types';
import {BaseError} from '@forworkchoe/core/utils';

export const beforeSend: ClientOptions['beforeSend'] = (event: ErrorEvent, hint: EventHint) => {
  // nextjs에서 server side에서 redirect() 하면 내부적으로 이 에러를 던져서 처리하도록 되어있는데 문제는 그게 Sentry까지 날아간다는 것이었음. 이거말고 다른 해결책을 못찾음.
  const isNextRedirectError = hint.originalException && typeof hint.originalException === 'object' && 'digest' in hint.originalException && typeof hint.originalException.digest === 'string' && hint.originalException.digest.includes('NEXT_REDIRECT');

  if (isNextRedirectError) {
    return null;
  }

  event.extra = {
    original: hint.originalException,
  };

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
}
