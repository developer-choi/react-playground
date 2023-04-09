import React from 'react';
import Image from 'next/image';
import {IMAGE} from '@util/dummy-image';

/**
 * 보면, fill은 아무것도 화면에 안나옴.
 * 컨테이너가 공간을 스스로 직접 가지고있어야 노출됨. (= 컨테이너 크기만큼 커지는게 fill임.)
 */

// URL: http://localhost:3000/study/next/image/layout/responsive-or-fill
export default function Page() {
  return (
    <>
      <div style={{position: 'relative'}}>
        <Image src={src} alt="스타이미지" layout="fill"/>
      </div>
      <div>
        <Image src={src} alt="스타이미지" layout="responsive" width={100} height={100}/>
      </div>
    </>
  );
}

const {src} = IMAGE.single.starcraft;
