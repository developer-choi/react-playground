import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {STARCRAFT_IMAGE} from '@util/dummy-image';

/**
 * 이미지 찌부되는 현상(기본값)을 해결하기 위한 방법 2. 애초에 지정한 비율의 이미지만 노출되도록함.
 */

// URL: http://localhost:3000/study/next/image/ratio/same
export default function Page() {
  return (
    <Wrap>
      <Image src={STARCRAFT_IMAGE.src} layout="responsive" width={600} height={600 / STARCRAFT_IMAGE.ratio} alt="스타크래프트 이미지"/>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
`;
