import React from 'react';
import {useRouter} from 'next/router';
import {booleanToString} from '@util/extend/string';

/**
 * Whether the router fields are updated client-side and ready for use.
 * Should only be used inside of useEffect methods and not for conditionally rendering on the server.
 * 한줄요약 = 렌더링하는데 쓰지마라.
 */
export default function Page() {
  return (
    <>
      <ErrorExample1/>
      <ErrorExample2/>
    </>
  );
}

function ErrorExample1() {
  const {isReady} = useRouter();
  return (
    <>
      {booleanToString(isReady)}
    </>
  );
}

function ErrorExample2() {
  const {isReady} = useRouter();

  if (isReady) {
    return (
      <div>Hello</div>
    );

  } else {
    return (
      <div>World</div>
    );
  }
}

