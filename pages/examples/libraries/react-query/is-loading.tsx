import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {timeoutPromise} from '@util/extend/promise';
import {booleanToString} from '@util/extend/string';

export default function Page() {
  const [enabled, setEnabled] = useState(false);
  const {isLoading, isFetching, data} = useQuery(['is-loading-test'], async () => {
    await timeoutPromise(2000);
    return {
      data: 'hello'
    }
  }, {
    enabled
  });

  useEffect(() => {
    setTimeout(() => {
      setEnabled(true);
    }, 2000);
  }, []);

  return (
    <div>
      enabled = {booleanToString(enabled)}<br/>
      isLoading = {booleanToString(isLoading)}<br/>
      isFetching = {booleanToString(isFetching)}<br/>
      data = {!data ? data : JSON.stringify(data)}
    </div>
  );
}
