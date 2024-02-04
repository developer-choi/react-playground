import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

/**
 * 보통 메인페이지에 텍스트랑 같이쓰는 섹션은
 * Image에 fill이 제격일것같음.
 */

// URL: http://localhost:3000/study/next/image/layout/fill-example/back-image-text
export default function Page() {
  return (
    <Section>
      <Image src="/images/back.jpg" alt="백그라운드 이미지" layout="fill" objectFit="cover"/>
      <TextWrap>
        <Item>200</Item>
        <Item>1,300</Item>
        <Item>1,400</Item>
      </TextWrap>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  height: 300px;
`;

const TextWrap = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: white;
  display: flex;
`;

const Item = styled.div`
  padding: 20px;
`;
