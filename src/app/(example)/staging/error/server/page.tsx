'use client';

import {CustomizedError} from '@/utils/service/error';

// URL: http://localhost:3000/staging/error/server
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
