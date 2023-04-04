import React from 'react';
import 'swiper/css';
import styled from 'styled-components';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import Image from 'next/image';
import {IMAGE_LIST} from '@util/dummy-image';

/** Flow
 * 1. 최초로딩 시점
 * (1) 1200px 이상에서는 문제안생김.
 * (2) 800 ~ 1200 사이에서 이미지가 최초에 크게나오는것으로보임. (가로길이 더 작을수록 더 잘보임)
 * (3) 800px미만은 (2)와 동일
 *
 * 2. 이후
 * (1) 1200px 이상에서는 더이상 이미지 안커짐.
 * (2) 800 ~ 1200px에서는 크기에맞게 이미지가 비율에맞춰서 조절됨. (이미지 안꺠지고, 홀쭉해지거나 늘어나는문제없음)
 * (3) 800px 미만에서는 이미지가 더 안작아짐.
 *
 * 3. 종합
 * 모든문제 해결됨
 *
 * 4. 접근방법
 * (1) swiper-initialized 클래스이름의 존재여부를 따져서,
 * (2) 최초 로딩 시점에는 slidesPerView, spaceBetween값을 기준으로 직접 계산해서 width값을 <div class=swiper-slide에 반영하고,
 * (3) 이후 로딩시점에는 빼는 방식으로 진행해봤음.
 */

// URL: http://localhost:3000/study/other-libraries/react-swiper/first-loading/second-step
export default function Page() {
  return (
    <Layout>
      <AnotherContents/>

      <Swiper {...swiperProps}>
        {IMAGE_LIST.rectangular.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} alt="상품이미지" layout="responsive" width={200} height={200}/>
            <Name>상품이름</Name>
            <Price>123,000 원</Price>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnotherContents/>
    </Layout>
  );
}

const slidesPerView = 5.5;
const spaceBetween = 20;

const Layout = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-width: 800px;
  
  .swiper-slide {
    border: 5px solid red;
    width: calc(calc(100% - ${(slidesPerView - 1) * spaceBetween}px) / ${slidesPerView});
    margin-right: ${spaceBetween}px;
  }
  
  .swiper-initialized .swiper-slide {
    border: 5px solid blue;
  }
`;

const Name = styled.div`
  
`;

const Price = styled.div`
  color: orange;
`;

const AnotherContents = styled.div`
  height: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: red;
`;

const swiperProps: SwiperProps = {
  slidesPerView,
  spaceBetween
};
