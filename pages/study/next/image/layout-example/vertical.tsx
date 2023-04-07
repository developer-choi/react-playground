import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

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

const image1 = 'https://oksite.kr/storage/images/banner/ebppI8N5VV8AzTabdVQdKBnPUj2qcYrIMDTmKDqa.jpg';
const image2 = 'https://img.atny.com/data/goods/ATNY/32/1223832/20220729224517067_W22---ralph_lauren_kids---875511005SPORT_PINK()NEWPORT_NAVY_list1.JPG';

const Wrapper = styled.div`
  > * {
    border: 5px solid red;
  }
`;
