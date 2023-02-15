import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper';
import styled from 'styled-components';

export default function Page() {
  return (
    <Wrap>
      <Swiper navigation modules={[Navigation]} loop className="swiper-wrap">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
    </Wrap>
  );
}

const Wrap = styled.div`
  .swiper-wrap {
    height: 500px;
    
    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      background: lightgray;
    }
  }
`;
