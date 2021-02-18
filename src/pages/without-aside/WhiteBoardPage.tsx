import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {ReactButton} from '../../components/styled/buttons';
import {forceUpdateStoreActionCreator} from '../../store/test/toggle';

export default function WhiteBoardPage() {

  return (
      <Wrap>
        <Counter/>
      </Wrap>
  );
}

function selector(state: RootState) {
  return {
    count: state.counter.count
  };
}

function Counter() {
  
  const dispatch = useDispatch();
  const {count} = useSelector<RootState, ReturnType<typeof selector>>(selector);
  
  const forceUpdateStore = useCallback(() => {
    dispatch(forceUpdateStoreActionCreator());
  }, [dispatch]);
  
  return (
      <CounterWrap>
        <Count>{count}</Count>
        <ReactButton onClick={forceUpdateStore}>Force Update Store</ReactButton>
      </CounterWrap>
  );
}

const Wrap = styled.div`
`;

const Count = styled.span`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 10px;
`;

const CounterWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
`;
