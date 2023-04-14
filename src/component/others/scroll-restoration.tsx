import {timeoutPromise} from '@util/extend/test';
import {range} from '@util/extend/data-type/number';
import OptionalLink from '@component/atom/OptionalLink';
import styled, {css} from 'styled-components';
import {flexCenter} from '@util/services/style/css';
import Link from 'next/link';
import React from 'react';

export function ScrollRestorationLinkList({list}: {list: ScrollRestorationLinkType[]}) {
  return (
    <LinkListWrap>
      {list.map(({href, name, key}) => (
        <ExampleRow key={key} target="_self" href={href}>
          {key}-[{name}]-{key}
        </ExampleRow>
      ))}
    </LinkListWrap>
  );
}

export function ScrollRestorationTargetLinkList() {
  return (
    <LinkListWrap>
      {SCROLL_RESTORATION_RANGE.map(value => (
        <Link key={value} href="/">
          <ScrolRestorationLinkRow>{value}</ScrolRestorationLinkRow>
        </Link>
      ))}
    </LinkListWrap>
  );
}

export const SCROLL_RESTORATION_HREFS = {
  default: '/study/next/scroll-restoration/default/target',
  solution1: '/study/next/scroll-restoration/solution1/target',
  solution2: '/study/next/scroll-restoration/solution2/target',
  mySolution: '/study/next/scroll-restoration/my-solution/target',
};

const SCROLL_RESTORATION_RANGE = range(1, 10);

export interface ScrollRestorationLinkType {
  name: string;
  href: string;
  key: number;
}

export interface ScrollRestorationExamplePageProp {
  list: ScrollRestorationLinkType[];
}

export async function getScrollRestorationDummyApi(internalHref: string): Promise<ScrollRestorationLinkType[]> {
  const list = SCROLL_RESTORATION_RANGE.map(value => {
    if (value % 2 === 0) {
      return {
        key: value,
        name: 'Internal Link',
        href: internalHref
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

const LinkListWrap = styled.div`
  padding: 20px;
`;

const rowStyle = css`
  border: 5px solid blue;
  height: 200px;
  ${flexCenter};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ScrolRestorationLinkRow = styled.a`
  ${rowStyle};
`;

const ExampleRow = styled(OptionalLink)`
  ${rowStyle};
  border: 5px solid red;
`;
