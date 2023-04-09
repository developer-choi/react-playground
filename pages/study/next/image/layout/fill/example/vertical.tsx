import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {IMAGE} from '@util/dummy-image';

/**
 * 브랜드랭킹 Vertical 솔루션임.
 * <img width={fixValue} height="auto"/>를 <Image/>로 해보려고했음.
 *
 * Limitation
 * Container에 height를 줘야함.
 */
// URL: http://localhost:3000/study/next/image/layout-example/vertical
export default function Page() {
  return (
    <Wrapper>
      <Solution src={image1} width={250}/>
      <Original src={image1} width={250}/>
      <Solution src={image2} width={250}/>
      <Original src={image2} width={250}/>
    </Wrapper>
  );
}

interface Prop {
  src: string;
  width: number;
}

function Solution({src, width}: Prop) {
  return (
    <SolutionWrap style={{width}}>
      <Image
        src={src}
        alt="배너이미지"
        layout="fill"
        objectFit="contain"
      />
    </SolutionWrap>
  );
}

const SolutionWrap = styled.div`
  position: relative;
  height: 300px;
`;

function Original({src, width}: Prop) {
  return (
    <img src={src} width={width} height="auto"/>
  );
}

const image1 = IMAGE.list.bigRectangular[0];
const image2 = IMAGE.list.rectangular[0];

const Wrapper = styled.div`
  > * {
    border: 5px solid red;
  }
`;
