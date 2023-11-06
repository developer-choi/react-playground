import React from 'react';
import {useMutation} from '@tanstack/react-query';

/**
 * URL: http://localhost:3000/study/rhf/reset-error/only-rhf
 *
 * 프로젝트에 rhf가 설치안되어있고, rq의 mutation만 쓸 수 있는 경우라면
 * mutation.reset()이 제한적으로나마 쓸모가 있음.
 * 최소한 화면에 노출할 error 피드백을 위한 별도 state 따로 안만들어도 되니까.
 */
export default function Page() {
  const mutation = useMutation(postApi);

  return (
    <div>
      <button onClick={() => mutation.mutateAsync()}>제출</button>
      <button type="button" onClick={() => mutation.reset()}>리셋</button>
      {!mutation.error ? null : (
        //@ts-ignore
        <div>{mutation.error.message}</div>
      )}
    </div>
  );
}

function postApi() {
  return Promise.reject({
    message: '잘못됨'
  });
}