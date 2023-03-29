import React from 'react';
import 'swiper/css';
import styled from 'styled-components';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import Image from 'next/image';

/** Flow
 * 새로고침해보면 최초로딩시점에 아무것도안보이지만 그 body에 세로스크롤이 생김.
 */

// URL: http://localhost:3000/study/next/image/responsive/bug1
export default function Page() {
  return (
    <Layout>
      <AnotherContents/>
      <Swiper {...swiperProps}>
        {imageList.map((image, index) => (
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

const AnotherContents = styled.div`
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: red;
`;

const Layout = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-width: 800px;
  height: 100%;
`;

const Name = styled.div`
  
`;

const Price = styled.div`
  color: orange;
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
