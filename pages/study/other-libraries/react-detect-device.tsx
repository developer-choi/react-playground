import React from 'react';
import {CustomView, getSelectorsByUserAgent, SelectorsByUserAgent} from 'react-device-detect';
import styled from 'styled-components';
import type {GetServerSidePropsContext} from 'next';
import {booleanToString} from '@util/extend/data-type/string';
import {useLogMount} from '@util/extend/test';

/**
 * SSR 단계에서 모바일 여부 판단할 수 있는 예제
 */

// URL: http://localhost:3000/study/other-libraries/react-detect-device
export default function Page(props: {selectors: SelectorsByUserAgent}) {
  const {isDesktop, isMobile} = props.selectors;

  return (
    <>
      <div>{booleanToString(isMobile, 'isMobile')}</div>
      <div>{booleanToString(isDesktop, 'isDesktop')}</div>
      <CustomView condition={isMobile}>
        <MobileComponent/>
      </CustomView>
      <CustomView condition={isDesktop}>
        <DesktopComponent/>
      </CustomView>
    </>
  );
}

export async function getServerSideProps({req}: GetServerSidePropsContext) {
  const userAgent = req.headers['user-agent'];
  const selectors = getSelectorsByUserAgent(userAgent as string);

  return {
    props: {
      selectors
    }
  };
}

function MobileComponent() {
  useLogMount('mobile-component');
  return (
    <MobileBox/>
  );
}

function DesktopComponent() {
  useLogMount('desktop-component');
  return (
    <DesktopBox/>
  );
}

const MobileBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: red;
`;

const DesktopBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: green;
`;
