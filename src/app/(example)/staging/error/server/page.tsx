'use client';

import {CustomizedError} from '@/utils/service/error';

/**
 * URL: http://localhost:3000/staging/error/server
 * Doc: https://docs.google.com/document/d/1fZMQM2K6BaFh4KScvHqraM1s1Y31sp82u9ZsjeDQT18/edit?tab=t.0#heading=h.qpa582km21d4
 */
export default function Page() {
  throw new CustomServerError('Some server error occurred');
}

class CustomServerError extends CustomizedError {
  readonly name = 'CustomServerError';
  readonly someCustomData = 'Some Custom Data';

  constructor(message: string) {
    super(message);
  }
}
