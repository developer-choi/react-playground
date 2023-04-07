import React from 'react';
import {IMAGE_LIST} from '@util/dummy-image';
import styled from 'styled-components';
import Image from 'next/image';

/** Goal
 * 브라우저 사이즈 줄였을 때
 * 이미지가 비율에 맞게 같이 줄어야 하는 경우 (가로 세로)
 * responsive를 하면, 이미지가 비율에맞게 줄어듬.
 */

// URL: http://localhost:3000/study/next/image/layout/responsive/example/product-section
export default function Page() {
  return (
    <Section>
      {IMAGE_LIST.rectangular.slice(0, 5).map(image => (
        <Wrap key={image}>
          <Image src={image} width={200} height={200} alt="상품이미지"/>
          <Title>상품이름</Title>
        </Wrap>
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

const Wrap = styled.div`
`;

const Title = styled.div`
`;
