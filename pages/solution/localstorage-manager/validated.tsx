import React, {useCallback} from 'react';
import {LocalStorageObjectManager, useLocalStorageObjectManager} from '@util/extend/browser/local-storage-object';
import {validateIncludeString} from '@util/extend/browser/query-string';
import Button from '@component/atom/element/Button';

// URL: http://localhost:3000/solution/localstorage-manager/validated

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
    fruit: 'apple'
  }
});

export default function Page() {
  const {state, changeState} = useLocalStorageObjectManager(manager);

  const changeToValidValue = useCallback(() => {
    changeState({fruit: 'apple'});
  }, [changeState]);

  const changeToInvalidValue = useCallback(() => {
    //@ts-ignore
    changeState({fruit: 'INVALID'});
  }, [changeState]);

  return (
    <>
      <div>data={state?.fruit ?? 'empty'}</div>
      <Button onClick={changeToValidValue}>유효한 값 셋팅</Button>
      <Button onClick={changeToInvalidValue}>잘못된 값 셋팅</Button>
    </>
  );
}
