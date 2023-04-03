import React from 'react';
import 'swiper/css';
import styled from 'styled-components';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import Image from 'next/image';

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
 * 1(2), 1(3)만 추가로 해결되면됨.
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
