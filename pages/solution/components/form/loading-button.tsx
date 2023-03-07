import React, {useCallback} from 'react';
import {useMutation} from '@tanstack/react-query';
import Button from '@component/atom/element/Button';
import {timeoutPromise} from '@util/extend/test';

// URL: http://localhost:3000/solution/components/form/loading-button
export default function Page() {
  const {mutate, mutateAsync, isLoading} = useMutation(someAsyncApi);

  const sendAsyncApi = useCallback(async () => {
    await mutateAsync();
  }, [mutateAsync]);

  const sendSyncApi = useCallback(() => {
    console.log('sync start');

    mutate(undefined, {
      onSettled: () => {
        console.log('settled');
      }
    });
  }, [mutate]);

  const onClick = useCallback(() => {
    alert('Hello World');
  }, []);

  return (
    <>
      <Button onClickWithLoading={sendAsyncApi}>Async Loading</Button>
      <Button onClick={sendSyncApi} loading={isLoading}>Sync Loading</Button>
      <Button onClick={onClick}>Normal Button</Button>
    </>
  );
}

async function someAsyncApi() {
  console.log('async start');
  await timeoutPromise(2000);
  console.log('async end');
}
