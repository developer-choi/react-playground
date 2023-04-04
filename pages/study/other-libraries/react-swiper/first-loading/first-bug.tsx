import React from 'react';
import 'swiper/css';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import styled from 'styled-components';
import {IMAGE_LIST} from '@util/dummy-image';

/** Flow
 * BugImg ==> 첫 페이지 로딩 때 이미지가 겁나크게보임. (뷰포트 꽉채움)
 * MotivationImg ==> 이후 로딩때 (평상시)에 이미지 겹쳐보임
 *
 * 그 원인은, img 태그에 width 관련 스타일때문에 그럼.
 *
 * react-swiper 기본동작이
 * 최초로딩 때는, SwiperSlide에 width가 설정되어있지 않지만,
 * 최초로딩이 지나면, 딱 알맞은 width가 SwiperSlide에 style attribute로 (inline style) 설정되기때문에,
 *
 * 최초로딩 시점에는 부모의 길이 (div는 block이라 width 최대로늘어남)만큼 이미지가 늘어나서,
 * 이미지가 굉장히 크게 나오는 문제가 있었음.
 */

// URL: http://localhost:3000/study/other-libraries/react-swiper/first-loading/first-bug
export default function Page() {
  return (
    <Swiper {...swiperProps}>
      {imageList.map(image => (
        <SwiperSlide key={image}>
          <BugImg src={image}/>
          {/*<MotivationImg src={image}/>*/}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const BugImg = styled.img`
  width: 100%;
`;

const MotivationImg = styled.img`
//  width 100% 안했음.
`;

const swiperProps: SwiperProps = {
  slidesPerView: 8.1,
  spaceBetween: 6
};

const imageList = IMAGE_LIST.rectangular.slice(0, 3);
