import React from 'react';
import 'swiper/css';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import styled from 'styled-components';
import {IMAGE_LIST} from '@util/dummy-image';

/** [Original / OriginalHtml]
 * Performance 탭으로 스크린샷떠가며 확인하면 로딩순서는 다음과같음. (단계별 캡처 필요)
 * 1. 최초에는 Slide 1개만보임. (Slide 하나가 swiper-slide width 100% 스타일 적용을 받아서 ==> spaceBetween이 이 단계에서는 영향을 주지않음.) << 그래서 <OriginalHtml/>가 하나만보임.
 * 2. 이후에 모든 슬라이드가 보임. (react-swiper 자체 CSR)
 */

/** [FixedWidth / FixedWidthHtml]
 * 아무튼, 그래서 first-bug.tsx에 있는 문제를
 * 1. 최초로딩시점에 swiper-slide 의 width값을 강제로 조절해본결과
 * 2. 최초로딩 시점에 swiper slide가 따닥따딱붙어있음. (<FixedWidthHtml/>에서 확인가능)
 *
 * >> space between을 전혀 적용받지못함.
 * >> space-between에 대한 간격도 직접 조정해야함. (<Original에서는, 처음에 SwiperSlide가 1개만 노출되기때문에, 이런 버그가 안보였을뿐임)
 * >> Original에서는 최초로딩이 지나면 style attribute로 margin-right를 통해 spaceBetween을 구현하고있음.
 * >> 직접 SwiperSlide width를 조절할거라면, margin-right도 같이 조정해야한다는 방향을 잡음.
 */

// URL: http://localhost:3000/study/other-libraries/react-swiper/first-loading/second-bug
export default function Page() {
  return (
    <>
      <Original/>
      <OriginalHtml/>
      <FixWidthReact/>
      <FixWidthHtml/>
    </>
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

function OriginalHtml() {
  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <Img src="https://oksite.kr/storage/images/banner/YoTmEhHQYaC5COBi0DIe5gI3ctAsCUkNNdI9vvpz.jpg"
               className="second-bug__Img-sc-nhflz1-0 gPAImI"/>
        </div>
        <div className="swiper-slide">
          <Img src="https://oksite.kr/storage/images/banner/9uPUPcW3PLZLpWGPlhcIlNUzBEMq4LPElBpWeyur.jpg"
               className="second-bug__Img-sc-nhflz1-0 gPAImI"/>
        </div>
        <div className="swiper-slide">
          <Img src="https://oksite.kr/storage/images/banner/D1YZ9XAOyDACo0T14DzlrWfo1fHVDNgJm48pRE2Q.jpg"
               className="second-bug__Img-sc-nhflz1-0 gPAImI"/>
        </div>
      </div>
    </div>
  );
}

function FixWidthReact() {
  return (
    <Swiper {...swiperProps}>
      {imageList.map(image => (
        <SwiperSlide style={{width: 200}} key={image}>
          <Img src={image}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function FixWidthHtml() {
  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide" style={{width: 200}}>
          <Img src="https://oksite.kr/storage/images/banner/YoTmEhHQYaC5COBi0DIe5gI3ctAsCUkNNdI9vvpz.jpg"
               className="second-bug__Img-sc-nhflz1-0 gPAImI"/>
        </div>
        <div className="swiper-slide" style={{width: 200}}>
          <Img src="https://oksite.kr/storage/images/banner/9uPUPcW3PLZLpWGPlhcIlNUzBEMq4LPElBpWeyur.jpg"
               className="second-bug__Img-sc-nhflz1-0 gPAImI"/>
        </div>
        <div className="swiper-slide" style={{width: 200}}>
          <Img src="https://oksite.kr/storage/images/banner/D1YZ9XAOyDACo0T14DzlrWfo1fHVDNgJm48pRE2Q.jpg"
               className="second-bug__Img-sc-nhflz1-0 gPAImI"/>
        </div>
      </div>
    </div>
  );
}

const Img = styled.img`
  width: 200px;
`;

const swiperProps: SwiperProps = {
  slidesPerView: 8.1,
  spaceBetween: 20
};

const imageList = IMAGE_LIST.rectangular.slice(0, 3);
