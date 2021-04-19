import React from 'react';
import styled from 'styled-components';
import BackgroundImage from './study/BackgroundImage';
import RatioBox from './study/RatioBox';

export default function RatioAndBackImageExample() {

  return (
      <div>
        <NaverBackImage src="https://www.navercorp.com/img/ko/main/img_main_slide1.jpg" aspectRatio={2}>
          hello world
        </NaverBackImage>
        <RatioBox style={{background: 'blue', width: '40%'}} aspectRatio={1}/>
        <NextBox/>
      </div>
  );
}

const NaverBackImage = styled(BackgroundImage)`
  width: 50%;
`;

const NextBox = styled.div`
  background: red;
  width: 100%;
  height: 200px;
`;
