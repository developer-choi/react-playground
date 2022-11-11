import React, {useCallback} from 'react';
import ValidateError from '@util/handle-error/ValidateError';
import {timeoutPromise} from '@util/extend/promise';
import {useMutation} from '@tanstack/react-query';
import {Button} from '@component/atom/button/button-presets';

export default function Page() {
  const {mutateAsync} = useMutation(updateTodo, {
    onSuccess: (data) => {
      console.log('general onSuccess() called', data);
    },
    onError: (error) => {
      console.log('general onError() called', error, (error as Error).name);
    }
  });

  const onSubmit = useCallback(async () => {
    try {
      await mutateAsync({pk: 1, title: ''});
      // await mutateAsync({pk: 1, title: "123"});
      console.log('Update success');
    } catch (error) {
      if (error instanceof ValidateError) {
        console.log('handling a ValidateError');
      }
    }
  }, [mutateAsync]);

  return (
    <Button onClick={onSubmit}>Update</Button>
  );
}

async function updateTodo({title}: {pk: number, title: string}) {
  if (title.length === 0) {
    throw new ValidateError('타이틀 길이 0임');
  }

  await timeoutPromise(300);

  return {
    status: 200
  };
}
