import React from 'react';
import {Swiper, SwiperProps, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import {Autoplay, Navigation} from "swiper";
import styled from 'styled-components';

// URL: http://localhost:3000/study/other-libraries/react-swiper/sample
export default function Page() {
  return (
    <Wrap>
      <Swiper className="swiper-wrap" {...swiperProps}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </Wrap>
  );
}

const swiperProps: SwiperProps = {
  autoplay: {
    delay: 1000
  },
  navigation: true,
  modules: [Navigation, Autoplay],
  loop: true
};

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
