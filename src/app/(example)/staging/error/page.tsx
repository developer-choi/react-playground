'use client';

import React, {useCallback} from 'react';
import {Button} from '@forworkchoe/core';
import type {SeverityLevel} from '@sentry/types';
import {CustomizedError} from '@forworkchoe/core/utils';

// URL: http://localhost:3000/staging/error
// Doc: https://docs.google.com/document/d/1TORw5hWSoWYiRhd6kg4D8tQ7pVsBQFOvPxavffrb4l0/edit?tab=t.0#heading=h.o3s6i3qc1fqj
export default function Page() {
  const throwError = useCallback((level: SeverityLevel) => {
    throw new CustomClientError(`throw ${level} error`, level);
  }, []);

  return (
    <>
      {LEVELS.map(level => (
        <Button key={level} onClick={() => throwError(level)}>throw {level} Error</Button>
      ))}
    </>
  );
}

const LEVELS: SeverityLevel[] = ['warning', 'fatal'];

class CustomClientError extends CustomizedError {
  readonly name = 'CustomClientError';
  readonly someCustomData = 'Some Custom Data';

  constructor(message: string, level: SeverityLevel) {
    super(message, {level});
  }
}
