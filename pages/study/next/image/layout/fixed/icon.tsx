import React from 'react';
import styled from 'styled-components';
import {IMAGE_LIST} from '@util/dummy-image';
import Image from 'next/image';

/** 아이콘 불러오는데는 fixed가 최적임.
 *
 * 1. responsive, fill: 컨테이너 사이즈 크기 커지면 이미지 커지는게 특징인데... 아이콘이 커진다...? 에러임.
 * 2. intrinsic: 컨테이너 사이즈 크기가 작아지든 어떠한 경우에서든 아이콘이 원래 크기보다 작아진다? 에러임.
 */

// URL: http://localhost:3000/study/next/image/layout/fixed/icon
export default function Page() {
  return (
    <>
      <MainNavSection/>
      <MainNavSection/>
    </>
  );
}

function MainNavSection() {
  return (
    <Section>
      {IMAGE_LIST.icon.map(image => (
        <a key={image}>
          <Image src={image} alt="아이콘이미지" layout="fixed" width={60} height={60}/>
        </a>
      ))}
    </Section>
  );
}

const Section = styled.div`
  max-width: 400px;
  height: 300px;
  margin: 0 auto;
  border: 5px solid red;
`;
