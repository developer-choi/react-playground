'use client';

import React, {useCallback} from 'react';
import {StorageObjectManager, useStorageObjectManager} from '@forworkchoe/core/hooks';
import {Button} from '@forworkchoe/core';
import {validateIncludeString} from '@/utils/extend/browser/query-string/validate';

// URL: http://localhost:3000/experimental/storage-manager/basic
export default function Page() {
  const {state, changeState, isHydrating} = useStorageObjectManager(manager);

  const changeToValidValue = useCallback(() => {
    changeState({fruit: 'kiwi'});
  }, [changeState]);

  const changeToInvalidValue = useCallback(() => {
    changeState({fruit: 'INVALID' as any});
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

const manager = new StorageObjectManager<{fruit: Fruit;}>({
  key: 'solution/validated',
  storage: 'LOCAL_STORAGE',
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
