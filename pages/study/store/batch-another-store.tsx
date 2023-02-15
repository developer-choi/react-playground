import React, {useCallback} from 'react';
import Button from '@component/atom/element/Button';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {increase} from '@store/reducers/counter';
import {increaseTwice} from '@store/reducers/twice-counter';
import {useLogWhenRendering} from '@util/extend/test';

export default function Page() {
  const dispatch = useAppDispatch();
  const normalCount = useAppSelector(state => state.counter.count);
  const twiceCount = useAppSelector(state => state.twiceCounter.count);

  //서로다른 slice도 같이 병합됨
  const increaseAll = useCallback(() => {
    dispatch(increase());
    dispatch(increaseTwice());
  }, [dispatch]);

  useLogWhenRendering('state', normalCount, twiceCount);

  return (
    <>
      <div>normalCount {normalCount}</div>
      <div>twiceCount {twiceCount}</div>
      <Button onClick={increaseAll}>Increase All</Button>
    </>
  );
}
