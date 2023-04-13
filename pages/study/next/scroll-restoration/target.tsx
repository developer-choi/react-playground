import React from 'react';
import styled from 'styled-components';
import {range} from '@util/extend/data-type/number';
import {flexCenter} from '@util/services/style/css';
import {timeoutPromise} from '@util/extend/test';
import OptionalLink from '@component/atom/OptionalLink';

// URL: http://localhost:3000/study/next/scroll-restoration/target
export default function Page() {
  return (
    <ExampleWrap>
      {ORIGINAL_VALUE_LIST.map(value => (
        <OriginalRow key={value}>{value}</OriginalRow>
      ))}
    </ExampleWrap>
  );
}

const SCROLL_RESTORATION_TARGET = '/study/next/scroll-restoration/target';
const ORIGINAL_VALUE_LIST = range(1, 10);

const OriginalRow = styled.a`
  height: 200px;
  border: 5px solid blue;
  ${flexCenter};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export interface ScrollRestorationLinkType {
  name: string;
  href: string;
  key: number;
}

export interface ScrollRestorationExamplePageProp {
  list: ScrollRestorationLinkType[];
}

export async function getScrollRestorationDummyApi(): Promise<ScrollRestorationLinkType[]> {
  const list = ORIGINAL_VALUE_LIST.map(value => {
    if (value % 2 === 0) {
      return {
        key: value,
        name: 'Internal Link',
        href: SCROLL_RESTORATION_TARGET
      };

    } else {
      return {
        key: value,
        name: 'External Link',
        href: 'https://www.naver.com'
      }
    }
  });

  await timeoutPromise(1000);
  return list;
}

export function ScrollRestorationLinkList({list}: {list: ScrollRestorationLinkType[]}) {
  return (
    <ExampleWrap>
      {list.map(({href, name, key}) => (
        <ExampleRow key={key} target="_self" href={href}>
          {key}-[{name}]-{key}
        </ExampleRow>
      ))}
    </ExampleWrap>
  );
}

const ExampleWrap = styled.div`
  padding: 20px;
`;

const ExampleRow = styled(OptionalLink)`
  height: 200px;
  border: 5px solid red;
  ${flexCenter};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;
