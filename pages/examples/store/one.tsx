import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../../../src/store/store';
import {decreaseActionCreator, increaseActionCreator} from '../../../src/store/reducers/counter';
import { Button } from '@components/atom/button/button-presets';
import {useRouter} from 'next/router';
import {store} from '../../../src/store/store';
import {decreaseAsyncActionCreator, increaseAsyncActionCreator} from '../../../src/store/sagas/count-saga';

export default function OnePage({count}: {count: number}) {
  
  return (
      <>
        <h1>One Page (ssr count {count})</h1>
        <Navigation/>
        <Counter/>
      </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      count: store.getState().counter.count //You can access the store but is not refreshed that.
    }
  };
}

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();
  
  const increase = React.useCallback(() => {
    dispatch(increaseActionCreator());
  }, [dispatch]);
  
  const increaseAsync = React.useCallback(() => {
    dispatch(increaseAsyncActionCreator());
  }, [dispatch]);
  
  const decrease = React.useCallback(() => {
    dispatch(decreaseActionCreator());
  }, [dispatch]);
  
  const decreaseAsync = React.useCallback(() => {
    dispatch(decreaseAsyncActionCreator());
  }, [dispatch]);
  
  return (
      <CounterWrap>
        <Button onClick={increaseAsync}>비동기 +</Button>
        <Button onClick={increase}>+</Button>
        <Count>{count}</Count>
        <Button onClick={decrease}>-</Button>
        <Button onClick={decreaseAsync}>비동기 -</Button>
      </CounterWrap>
  );
}

const CounterWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const Count = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export function Navigation() {
  const {pathname} = useRouter();
  
  return (
      <NavWrap>
        {params.map(param => (
            <Link key={param} href={`/examples/store/${param}`}>
              <Anchor className={pathname.endsWith(param) ? 'active' : ''}>{param}</Anchor>
            </Link>
        ))}
      </NavWrap>
  );
}

const params = ['one', 'two', 'three'];

const NavWrap = styled.nav`
  display: flex;
`;

const Anchor = styled.a`
  padding: 5px 15px;
  border: 1px solid white;
  border-radius: 10px;
  
  &.active, &:hover {
    background: ${props => props.theme.main};
    color: white;
    transition: color, background-color, 0.4s;
  }
`;