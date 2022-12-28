import React, {useCallback} from 'react';
import Button from '@component/atom/element/Button';
import {timeoutPromise} from '@util/extend/promise';

export default function Page() {
  const asyncCallApi = useCallback(async () => {
    console.log('timeout start');

    await timeoutPromise(3000); //Until terminated, a user can interact UI. (During processing, a user can click the 'Click me' button.)

    console.log('timeout end');

    bigTask(); //Until terminated, a user can't interact UI. (During processing, a user can't click the 'Click me' button.)

    console.log('asyncCallApi() end');
  }, []);

  return (
    <>
      <Button onClick={asyncCallApi}>Async call API</Button>
      <Button onClick={() => console.log('Clicked')}>Click me</Button>
    </>
  );
}

function bigTask() {
  console.log('loop start');
  for(let i = 0 ; i < 1e10 ; i++){}
  console.log('loop end');
}
