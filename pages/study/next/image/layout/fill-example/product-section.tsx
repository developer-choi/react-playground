import React from 'react';
import {IMAGE} from '@util/dummy-image';
import styled from 'styled-components';
import Image from 'next/image';

/** Goal(Bad example)
 * 브라우저 사이즈 줄였을 때
 * 이미지가 비율에 맞게 같이 줄어야 하는 경우 (가로 세로)
 * responsive를 하면, 이미지가 비율에맞게 줄어듬.
 * 하지만 이걸 억지로 fill과 wrapper에 aspect-ratio를 주면 흉내는 가능함.
 */

// URL: http://localhost:3000/study/next/image/layout/fill-example/product-section
export default function Page() {
  return (
    <Section>
      {IMAGE.list.rectangular.slice(0, 5).map(image => (
        <Item key={image}>
          <ImageWrap>
            <Image src={image} layout="fill" alt="상품이미지"/>
          </ImageWrap>
          <Title>상품이름</Title>
        </Item>
      ))}
    </Section>
  );
}

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  
  >:not(:last-of-type) {
    margin-right: 50px;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 1;
`;

const Item = styled.div`
  width: 20%;
`;

const Title = styled.div`
`;
