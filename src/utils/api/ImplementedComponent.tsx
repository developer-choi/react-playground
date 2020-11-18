import React, {useCallback} from 'react';
import axios from 'axios';
import {handleError} from './api-core';
import {LOGIN_EXPECTED_CODES, loginErrorCodeToMessage} from './api-implement';

export default function ImplementedComponent() {

  const request = useCallback(async () => {
    try {
      const response = await axios.get('protocol://api-path');
      //do something

    } catch (error) {
      handleError({
        error,
        expectedCodes: LOGIN_EXPECTED_CODES,
        expected: errorCode => {
          const errorMessage = loginErrorCodeToMessage(errorCode);
          //do something
        }
      });
    }
  }, []);

  return (
      <div>
        <button onClick={request}>Api Request</button>
      </div>
  )
}
