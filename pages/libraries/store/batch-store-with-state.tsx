import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import useCounter from '@util/custom-hooks/useCounter';
import Button from '@component/atom/element/Button';
import {increase} from '@store/reducers/counter';

/**
 * Store의 state와
 * Component의 Local state와
 * 렌더링이 서로 병합된다는게 너무 신기했다.
 */
export default function Page() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(state => state.counter.count);

  const localCounter = useCounter();

  const increaseAll = useCallback(() => {
    //한번에 local state, store 둘 다 업데이트했지만
    localCounter.increase();
    dispatch(increase());
  }, [dispatch, localCounter]);

  useEffect(() => {
    //렌더링은 한번만됬음.
    console.log('state', count, localCounter.count);
  }, [count, localCounter.count]);

  return (
    <>
      <div>Local {localCounter.count}</div>
      <div>Store {count}</div>
      <Button onClick={increaseAll}>Increase All</Button>
    </>
  );
}
