import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import moment from 'moment';
import type { RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@components/atom/button/button-presets';
import { decreaseActionCreator, increaseActionCreator } from '@store/reducers/counter';
import { useRouter } from 'next/router';

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
  const paths = useRouter().pathname.split('/');
  return (
    <Tab>
      {LINKS.map(({text, href, type}) => (
        <Link passHref key={href} href={href} prefetch={false}>
          <Anchor className={paths.includes(type) ? 'active' : ''}>{text}</Anchor>
        </Link>
      ))}
    </Tab>
  );
}

const LINKS: { href: string; text: string; type: 'sp' | 'ssp' }[] = [
  {type: 'sp', href: '/examples/api/static-props-hydration/sp', text: 'getStaticProps'},
  {type: 'ssp', href: '/examples/api/static-props-hydration/ssp', text: 'getServerSideProps'},
];

const Tab = styled.div`
  display: flex;
  > a {
    margin-right: 10px;
  }
`;

const Anchor = styled.a`
  &.active {
    font-weight: bold;
    color: ${props => props.theme.main};
  }
`;

export function Timer() {
  const [timestamp, setTimestamp] = useState(0);
  
  useEffect(() => {
    setTimestamp(new Date().getTime());
    
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
  
  const inCrease = useCallback(() => {
    dispatch(increaseActionCreator());
  }, [dispatch]);
  
  const deCrease = useCallback(() => {
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
