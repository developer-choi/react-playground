import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper';
import styled from 'styled-components';

// URL: http://localhost:3000/study/react-swiper
export default function Page() {
  return (
    <Wrap>
      <Swiper navigation modules={[Navigation]} loop className="swiper-wrap">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>

        {/* Bug */}
        <CustomSlide/>
      </Swiper>
    </Wrap>
  );
}

function CustomSlide() {
  return (
    <SwiperSlide>Slide 6</SwiperSlide>
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
