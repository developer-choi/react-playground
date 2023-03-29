import React from 'react';
import 'swiper/css';
import styled from 'styled-components';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import Image from 'next/image';

/** Flow
 * 1. 1200px 이상 / 800px 미만 / 800px ~ 1200 사이 반응형 반영
 * 2. 최초로딩시정메 어떠한 UI버그도 없음. (레이아웃시프트, 처음에 갑자기 뭔가 커지거나 엄청 작거나)
 */

// URL: http://localhost:3000/study/other-libraries/react-swiper/product-swiper
export default function Page() {
  return (
    <Layout>
      <AnotherContents/>

      <Swiper {...swiperProps}>
        {imageList.map((image, index) => (
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

const imageList = [
  'https://oksite.kr/storage/images/banner/YoTmEhHQYaC5COBi0DIe5gI3ctAsCUkNNdI9vvpz.jpg',
  'https://oksite.kr/storage/images/banner/9uPUPcW3PLZLpWGPlhcIlNUzBEMq4LPElBpWeyur.jpg',
  'https://oksite.kr/storage/images/banner/D1YZ9XAOyDACo0T14DzlrWfo1fHVDNgJm48pRE2Q.jpg',
  'https://oksite.kr/storage/images/banner/YoTmEhHQYaC5COBi0DIe5gI3ctAsCUkNNdI9vvpz.jpg',
  'https://oksite.kr/storage/images/banner/9uPUPcW3PLZLpWGPlhcIlNUzBEMq4LPElBpWeyur.jpg',
  'https://oksite.kr/storage/images/banner/D1YZ9XAOyDACo0T14DzlrWfo1fHVDNgJm48pRE2Q.jpg',
  'https://oksite.kr/storage/images/banner/YoTmEhHQYaC5COBi0DIe5gI3ctAsCUkNNdI9vvpz.jpg',
  'https://oksite.kr/storage/images/banner/9uPUPcW3PLZLpWGPlhcIlNUzBEMq4LPElBpWeyur.jpg',
  'https://oksite.kr/storage/images/banner/D1YZ9XAOyDACo0T14DzlrWfo1fHVDNgJm48pRE2Q.jpg',
];
