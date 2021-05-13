import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {decreaseAsyncActionCreator, increaseAsyncActionCreator} from '../store/sagas/count-saga';
import {decreaseActionCreator, increaseActionCreator} from '../store/reducers/counter';
import {RootState} from '../store/store';
import {requestFetchUserActionCreator} from '../store/sagas/user-saga';
import ButtonExtend from '@components/atom/button/ButtonExtend';
import { ReactButton } from '@components/atom/button/button-presets';

export default function WhiteBoardPage() {

  return (
      <Wrap>
        <Counter/>
        <UserComponent/>
      </Wrap>
  );
}

const Wrap = styled.div`
  margin: 100px auto;
`;

function userSelector(state: RootState) {
  return state.user.name;
}

function UserComponent() {
  const name = useSelector<RootState, ReturnType<typeof userSelector>>(userSelector);
  const dispatch = useDispatch();
  const fetchUser = useCallback(() => {
    dispatch(requestFetchUserActionCreator(123));
  }, [dispatch]);
  return (
      <UserWrap>
        <Name>{name}</Name>
        <ReactButton onClick={fetchUser}>Fetch user</ReactButton>
      </UserWrap>
  );
}

const UserWrap = styled.div`
  margin: 100px auto;
`;

const Name = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 50px;
`;

function countSelector(state: RootState) {
  return state.counter.count;
}

function Counter() {
  
  const count = useSelector<RootState, ReturnType<typeof countSelector>>(countSelector);
  const dispatch = useDispatch();
  
  const increase = useCallback(() => {
    dispatch(increaseActionCreator());
  }, [dispatch]);
  const decrease = useCallback(() => {
    dispatch(decreaseActionCreator());
  }, [dispatch]);
  const increaseAsync = useCallback(() => {
    dispatch(increaseAsyncActionCreator());
  }, [dispatch]);
  const decreaseAsync = useCallback(() => {
    dispatch(decreaseAsyncActionCreator());
  }, [dispatch]);
  
  return (
      <CounterWrap>
        <Count>count: {count}</Count>
        <CustomButton onClick={increase}>+</CustomButton>
        <CustomButton onClick={decrease}>-</CustomButton>
        <CustomButton onClick={increaseAsync}>async +</CustomButton>
        <CustomButton onClick={decreaseAsync}>async -</CustomButton>
      </CounterWrap>
  );
}

const CounterWrap = styled.div`
  > * {
    margin-right: 15px;
  }
`;

const Count = styled.span`
  font-weight: bold;
`;

const CustomButton = styled(ButtonExtend)`
  border-radius: 5px;
  min-width: 60px;
  padding: 15px 7px;
  background-color: lightcoral;
  color: white;
`;
