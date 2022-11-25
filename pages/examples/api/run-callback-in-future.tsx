import React, {useCallback, useState} from 'react';
import {getDiffDate} from '@util/extend/date/date-util';
import {useRunCallbackInFuture} from '@util/custom-hooks/date-effect';

export default function Page() {
  
  const [message, setMessage] = useState(`The callback is scheduled to run in ${SECONDS} seconds.`);
  
  const changeMessage = useCallback(() => {
    setMessage('The callback is executed');
  }, []);
  
  // Run the callback function after {SECONDS} seconds.
  useRunCallbackInFuture(getDiffDate(new Date(), [0, 0, 0, 0, 0, SECONDS]).getTime(), changeMessage);
  
  return (
    <div>
      {message}
    </div>
  );
}

const SECONDS = 5;
