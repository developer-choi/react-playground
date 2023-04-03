import React from 'react';
import 'swiper/css';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import styled from 'styled-components';

/** Flow
 * 첫 페이지 로딩 때 이미지가 겁나크게보임. (뷰포트 꽉채움)
 */

// URL: http://localhost:3000/study/other-libraries/react-swiper/first-loading/first-bug
export default function Page() {
  return (
    <Swiper {...swiperProps}>
      {imageList.map(image => (
        <SwiperSlide key={image}>
          <Img src={image}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const Img = styled.img`
  width: 100%;
`;

const swiperProps: SwiperProps = {
  slidesPerView: 8.1,
  spaceBetween: 6
};

const imageList = [
  'https://oksite.kr/storage/images/banner/YoTmEhHQYaC5COBi0DIe5gI3ctAsCUkNNdI9vvpz.jpg',
  'https://oksite.kr/storage/images/banner/9uPUPcW3PLZLpWGPlhcIlNUzBEMq4LPElBpWeyur.jpg',
  'https://oksite.kr/storage/images/banner/D1YZ9XAOyDACo0T14DzlrWfo1fHVDNgJm48pRE2Q.jpg',
];
