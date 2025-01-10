import type {ErrorEvent, EventHint} from '@sentry/types';

export function beforeSend(event: ErrorEvent, hint: EventHint) {
  event.extra = {
    original: hint.originalException,
  };

  return event;
}
