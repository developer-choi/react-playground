'use client';

import {getDiffDate} from '@forworkchoe/core/utils';
import React, {useCallback, useState} from 'react';
import {useRunCallbackInFuture} from '@forworkchoe/core/hooks';

// URL: http://localhost:3000/solution/etc/run-callback-future
export default function Page() {
  const [message, setMessage] = useState(`The callback is scheduled to run in ${SECONDS} seconds.`);

  const changeMessage = useCallback(() => {
    setMessage('The callback is executed');
  }, []);

  // Run the callback function after {SECONDS} seconds.
  useRunCallbackInFuture(FUTURE, changeMessage);

  return (
    <div>
      {message}
    </div>
  );
}

const SECONDS = 5;
const FUTURE = getDiffDate(new Date(), [0, 0, 0, 0, 0, SECONDS]).getTime();
