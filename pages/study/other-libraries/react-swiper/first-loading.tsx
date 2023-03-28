import React from 'react';
import styled from 'styled-components';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * 첫 페이지 로딩 때 이미지가 겁나크게보임. (뷰포트 꽉채움)
 * 그 원인은, img 태그에 width 관련 스타일때문에 그럼.
 *
 * react-swiper 기본동작이
 * 최초로딩 때는, SwiperSlide에 width가 설정되어있지 않지만,
 * 최초로딩이 지나면, 딱 알맞은 width가 SwiperSlide에 style attribute로 (inline style) 설정되기때문에,
 *
 * 최초로딩 시점에는 부모의 길이 (div는 block이라 width 최대로늘어남)만큼 이미지가 늘어나서,
 * 이미지가 굉장히 크게 나오는 문제가 있었음.
 *
 * 그래서 이 문제를 어떻게 해결할 수 있을지까지는 아직 잘 모르고,
 * 단순 버그예제 확보를 위해 이 페이지 만듬.
 */

// URL: http://localhost:3000/study/other-libraries/react-swiper/first-loading
export default function Page() {
  return (
    <Swiper navigation modules={[Navigation]} slidesPerView={3} spaceBetween={50}>
      {IMAGES.map(image => (
        <SwiperSlide key={image}>
          <Img src={image} alt="스와이퍼 이미지"/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const IMAGES = [
  '/images/product/product1.jfif',
  '/images/product/product2.jfif',
  '/images/product/product1.jfif'
]

const Img = styled.img`
  width: 100%;
`;
