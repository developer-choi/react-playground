import React from 'react';
import {CustomView, getSelectorsByUserAgent, SelectorsByUserAgent} from 'react-device-detect';
import {booleanToString} from '@util/extend/string';
import styled from 'styled-components';
import useLogMount from '@util/custom-hooks/useLogMount';
import type {GetServerSidePropsContext} from 'next';

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
