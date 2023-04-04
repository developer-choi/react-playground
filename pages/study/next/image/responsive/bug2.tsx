import React from 'react';
import 'swiper/css';
import styled from 'styled-components';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import Image from 'next/image';
import {IMAGE_LIST} from '@util/dummy-image';

/** Flow (반응형은 되지만, 반응형 최초로딩시점에서 버그가발생함)
 * 1. 페이지 최초로딩 이후에,
 * 2. 브라우저 가로길이를 800px ~ 1200px 사이로 각각 조절할 때 반응형이 가능.
 * 3. 1200px 이상에서는 더 안늘어나고, 800px에서는 더 안줄어드는 상황이라고 가정했음.
 * 4. 1200px 이상에서는 첫 페이지 로딩시점에 레이아웃시프트 현상이 없으나,
 * 5. 1200px 미만에서는 첫 페이지 로딩시점에 레이아웃시프트 현상이 발생함. (800px에서 제일잘보임)
 */

// URL: http://localhost:3000/study/other-libraries/react-swiper/product-swiper
export default function Page() {
  return (
    <Layout>
      <AnotherContents/>

      <Swiper {...swiperProps}>
        {IMAGE_LIST.rectangular.map((image, index) => (
          <SwiperSlide key={index}>
            <ImageWrapper>
              <Image src={image} alt="상품이미지" layout="responsive" width={200} height={200}/>
            </ImageWrapper>
            <Name>상품이름</Name>
            <Price>123,000 원</Price>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnotherContents/>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-width: 800px;
`;

const Name = styled.div`
  
`;

const Price = styled.div`
  color: orange;
`;

const ImageWrapper = styled.div`
  max-width: 200px;
`;

const AnotherContents = styled.div`
  height: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: red;
`;

const swiperProps: SwiperProps = {
  slidesPerView: 5.5,
  spaceBetween: 10
};
