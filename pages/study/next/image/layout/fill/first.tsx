import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {IMAGE} from '@util/dummy-image';

/**
 * 보면, 아무것도 화면에 안나옴.
 *
 * layout fill만 사용할 경우, (objectFit props없이)
 * Wrapper에 width나 height를 줘야 그만큼 늘어난다.
 * 그래서 안주면 안늘어나는 현상이 있음.
 */

// URL: http://localhost:3000/study/next/image/layout/fill/first
export default function Page() {
  return (
    <Wrapper>
      <Image
        src={IMAGE.list.bigRectangular[0]}
        alt="배너이미지"
        layout="fill"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  
  > * {
    border: 5px solid red;
  }
`;
