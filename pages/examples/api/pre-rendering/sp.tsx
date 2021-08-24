import React, { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import moment from 'moment';
import type { RootState } from '../../../../src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@components/atom/button/button-presets';
import { decreaseActionCreator, increaseActionCreator } from '../../../../src/store/reducers/counter';

export default function StaticPropsPage() {
  return (
    <>
      <TabMenus/>
      <Timer/>
      <Counter/>
    </>
  );
}

export function TabMenus() {
  return (
    <Tab>
      {LINKS.map(({text, href}) => (
        <Link key={href} href={href} prefetch={false}>
          <a>{text}</a>
        </Link>
      ))}
    </Tab>
  );
}

const LINKS: { href: string, text: string; }[] = [
  {href: '/examples/api/pre-rendering/sp', text: 'getStaticProps'},
  {href: '/examples/api/pre-rendering/ssp', text: 'getServerSideProps'},
];

const Tab = styled.div`
  display: flex;
  > a {
    margin-right: 10px;
  }
`;

export function Timer() {
  const [timestamp, setTimestamp] = useState(0);
  
  useLayoutEffect(() => {
    setTimestamp(new Date().getTime());
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimestamp(new Date().getTime());
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  if (!timestamp) {
    return null;
  }
  
  return (
    <span>{moment(timestamp).format('HH:mm:ss')}</span>
  );
}

function selector(state: RootState) {
  return state.counter.count;
}

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector<RootState, ReturnType<typeof selector>>(selector);
  
  const inCrease = React.useCallback(() => {
    dispatch(increaseActionCreator());
  }, [dispatch]);
  
  const deCrease = React.useCallback(() => {
    dispatch(decreaseActionCreator());
  }, [dispatch]);
  
  return (
    <CounterWrap>
      <Button onClick={inCrease}>+</Button>
      <Count>{count}</Count>
      <Button onClick={deCrease}>-</Button>
    </CounterWrap>
  );
}

const CounterWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
