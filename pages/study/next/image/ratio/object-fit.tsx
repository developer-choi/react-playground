import React from 'react';
import styled from 'styled-components';
import {IMAGE} from '@util/dummy-image';
import Image from 'next/image';
import type {Property} from 'csstype';

/**
 * 이미지가 찌부되는것을 막기위한 방법 2(1) crop을 하되 상황에맞게 잘 crop한다.
 * objectFit, objectPosition 2개로 조절할 수 있다.
 * crop할 수 있는 objectFit는 cover밖에 없음.
 */

// URL: http://localhost:3000/study/next/image/ratio/object-fit
export default function Page() {
  return (
    <>
      <ExampleImage objectFit="fill"/>
      <ExampleImage objectFit="cover"/>
      <ExampleImage objectFit="contain"/>
    </>
  );
}

interface ExampleProp {
  objectFit?: Property.ObjectFit;
}

function ExampleImage({objectFit}: ExampleProp) {
  return (
    <ExampleWrap>
      <BorderWrapper>
        <Image src={src} alt="스타크래프트 이미지" layout="fill" objectFit={objectFit}/>
      </BorderWrapper>
      <BorderWrapper>
        <Image src={src} alt="스타크래프트 이미지" layout="fill" objectFit={objectFit} objectPosition="top"/>
      </BorderWrapper>
      <BorderWrapper>
        <Image src={src} alt="스타크래프트 이미지" layout="fill" objectFit={objectFit} objectPosition="bottom"/>
      </BorderWrapper>
      <BorderWrapper>
        <Image src={src} alt="스타크래프트 이미지" layout="fill" objectFit={objectFit} objectPosition="right"/>
      </BorderWrapper>
      <BorderWrapper>
        <Image src={src} alt="스타크래프트 이미지" layout="fill" objectFit={objectFit} objectPosition="left"/>
      </BorderWrapper>
    </ExampleWrap>
  );
}

const {src} = IMAGE.single.starcraft;

const ExampleWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const BorderWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border: 5px solid red;
`;
