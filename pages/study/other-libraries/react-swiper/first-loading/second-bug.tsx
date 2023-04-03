import React from 'react';
import 'swiper/css';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import styled from 'styled-components';

/** first-bug.tsx와 차이점은,
 * <Img> 태그의 width만 100%에서 100px만 달라짐.
 *
 * <Original/>
 * Performance 탭으로 스크린샷떠가며 확인하면 로딩순서는 다음과같음. (단계별 캡처 필요)
 * 1. 최초에는 Slide 1개만보임. (Slide 하나가 swiper-slide width 100% 스타일 적용을 받아서 ==> spaceBetween이 이 단계에서는 영향을 주지않음.)
 * 2. 이후에 모든 슬라이드가 보임. (react-swiper 자체 CSR)
 *
 * <Initialize/>
 * 위의 1번 단계의 html을 그대로 긁어옴.
 * 그래서 하나만보임.
 *
 * (이후내용)
 * 그래서, 최초로딩시점에 swiper-slide 의 width값을 강제로 조절할 경우,
 * space-between에 대한 간격을 직접 조정해야함. (스와이퍼에서도 처음에는 spaceBetween 무시하고 하나만 노출하니까)
 */

// URL: http://localhost:3000/study/other-libraries/react-swiper/first-loading/second-bug
export default function Page() {
  return (
    <Initializing/>
  );
}

function Original() {
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

function Initializing() {
  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <Img src="https://oksite.kr/storage/images/banner/YoTmEhHQYaC5COBi0DIe5gI3ctAsCUkNNdI9vvpz.jpg"
               className="first-loading__Img-sc-jleaxm-0 fUKtut" />
        </div>
        <div className="swiper-slide">
          <Img src="https://oksite.kr/storage/images/banner/9uPUPcW3PLZLpWGPlhcIlNUzBEMq4LPElBpWeyur.jpg"
               className="first-loading__Img-sc-jleaxm-0 fUKtut" />
        </div>
        <div className="swiper-slide">
          <Img src="https://oksite.kr/storage/images/banner/D1YZ9XAOyDACo0T14DzlrWfo1fHVDNgJm48pRE2Q.jpg"
               className="first-loading__Img-sc-jleaxm-0 fUKtut" />
        </div>
      </div>
    </div>
  );
}

const Img = styled.img`
  width: 100px;
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
