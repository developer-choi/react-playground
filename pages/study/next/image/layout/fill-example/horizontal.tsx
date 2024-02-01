import React from "react";
import Image from "next/image";
import styled from "styled-components";
import {IMAGE} from "@util/dummy-image";

/**
 * 브랜드랭킹 Horizontal 솔루션임.
 * <img width="auto" height={fixValue}/>를 <Image/>로 해보려고했음.
 *
 * 한계는, ? 아 한계까지는 아닌진 모르겠지만,
 * 이미지 가로길이보다 더 적게 브라우저 사이즈 줄이면 (236px미만)
 * <img width="auto" height={fixValue}/>와 동작이 달라짐.
 */
// URL: http://localhost:3000/study/next/image/layout/fill-example/horizontal
export default function Page() {
  return (
    <Wrapper>
      <Solution src={image1} height={104} />
      <Solution src={image2} height={104} />
      <Original src={image1} height={104} />
      <Original src={image2} height={104} />
    </Wrapper>
  );
}

interface Prop {
  src: string;
  height: number;
}

function Solution({src, height}: Prop) {
  return (
    <SolutionWrap style={{height}}>
      <Image src={src} alt="배너이미지" layout="fill" objectFit="contain" />
    </SolutionWrap>
  );
}

const SolutionWrap = styled.div`
  position: relative;
`;

function Original({src, height}: Prop) {
  return <img src={src} height={height} width="auto" alt="" />;
}

const image1 = IMAGE.list.bigRectangular[0];
const image2 = IMAGE.list.rectangular[0];

const Wrapper = styled.div`
  > * {
    border: 5px solid red;
  }

  // <img 잘보이게하려고했음.
  > img {
    display: block;
  }
`;
