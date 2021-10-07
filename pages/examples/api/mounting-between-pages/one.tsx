import styled from 'styled-components';
import useLoggingMount from '@util/custom-hooks/useLoggingMount';
import React from 'react';
import {Button} from '@component/atom/button/button-presets';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function OnePage() {
  
  return (
    <>
      <MountTestHeader/>
      OnePage
    </>
  );
}

export function MountTestHeader() {
  useLoggingMount('header');
  const {pathname} = useRouter();
  return (
    <>
      <CustomHeader>
        <Link passHref href="/examples/api/mounting-between-pages/one">
          <Button className={pathname.endsWith('one') ? '' : 'gray'} as="a">One</Button>
        </Link>
        <Link passHref href="/examples/api/mounting-between-pages/two">
          <Button className={pathname.endsWith('two') ? '' : 'gray'} as="a">Two</Button>
        </Link>
        <Link passHref href="/examples/api/mounting-between-pages/three">
          <Button className={pathname.endsWith('three') ? '' : 'gray'} as="a">Three</Button>
        </Link>
      </CustomHeader>
    </>
  );
}

const CustomHeader = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  column-gap: 20px;
`;
