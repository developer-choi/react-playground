import React, {useCallback} from 'react';
import {Button} from '@component/atom/button/button-presets';

export default function Page() {
  const asyncCallApi = useCallback(async () => {
    await timeoutPromise(3000);
    console.log('asyncCallApi() end');
  }, []);

  return (
    <>
      <Button onClick={asyncCallApi}>Async call API</Button>
      <Button onClick={() => console.log('Clicked')}>Click me</Button>
    </>
  );
}

function timeoutPromise(time: number) {
  console.log('timeoutPromise() call');
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
