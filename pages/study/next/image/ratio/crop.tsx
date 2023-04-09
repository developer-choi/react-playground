import React from 'react';
import Image from 'next/image';
import {STARCRAFT_IMAGE} from '@util/dummy-image';

/** 이미지 찌부되는 현상(기본값)을 해결하기 위한 방법 1. crop
 * crop을 제일쉽게 구현하는방법은 fill + objectFit 조절
 */

// URL: http://localhost:3000/study/next/image/ratio/crop
export default function Page() {
  return (
    <div style={{position: 'relative', width: 600, height: 600}}>
      <Image src={STARCRAFT_IMAGE.src} alt="비율 테스트" layout="fill" objectFit="cover"/>
    </div>
  );
}
