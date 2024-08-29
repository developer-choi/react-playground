'use client';

import React, {useCallback} from 'react';
import {LocalStorageObjectManager, useLocalStorageObjectManager} from '@/utils/extend/browser/local-storage-object';
import Button from '@/components/element/Button';
import {validateIncludeString} from '@/utils/extend/browser/query-string';

// URL: http://localhost:3000/experimental/localstorage-manager/basic
export default function Page() {
  const {state, changeState, isHydrating} = useLocalStorageObjectManager(manager);

  const changeToValidValue = useCallback(() => {
    changeState({fruit: 'kiwi'});
  }, [changeState]);

  const changeToInvalidValue = useCallback(() => {
    //@ts-ignore
    changeState({fruit: 'INVALID'});
  }, [changeState]);

  if (isHydrating) {
    return null;
  }

  return (
    <>
      <div>data={state?.fruit ?? 'empty'}</div>
      <Button onClick={changeToValidValue}>유효한 값 셋팅</Button>
      <Button onClick={changeToInvalidValue}>잘못된 값 셋팅</Button>
    </>
  );
}

type Fruit = 'apple' | 'banana' | 'kiwi'
const FRUIT_TYPE_LIST: Fruit[] = ['apple', 'banana', 'kiwi'];

const manager = new LocalStorageObjectManager<{fruit: Fruit;}>({
  key: 'solution/validated',
  validateCallback: parsedValue => {
    return !!validateIncludeString(parsedValue.fruit, FRUIT_TYPE_LIST, {
      throwable: false,
      required: true
    });
  },
  defaultValue: {
    fruit: 'banana'
  }
});
