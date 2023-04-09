import React from 'react';
import Image from 'next/image';
import {IMAGE} from '@util/dummy-image';

/** intrinsic Flow
 * 브라우저 가로길이를 줄여보면,
 * 이미지가 컨테이너 크게가 늘어났을 때 가만히있고 (이미지의 원본크기만큼 늘어나긴하고)
 * 컨테이너 크기 줄어들면 따라서 줄어듬
 */

/** fixed Flow
 * 브라우저 가로길이를 줄여보면,
 * 이미지가 컨테이너 크게가 늘어났을 때 가만히있고 (이미지의 원본크기만큼 늘어나긴하고)
 * 컨테이너 크기 줄어들어도 이미지 원래크기 유지함.
 */

//http://localhost:3000/study/next/image/layout/intrinsic-or-fixed
export default function Page() {
  return (
    <>
      <IntrinsicExample/>
      <FixedExample/>
    </>
  );
}

function IntrinsicExample() {
  return (
    <div>
      <Image width={square} height={square} src={src} alt="ALT" layout="intrinsic"/>
    </div>
  );
}

function FixedExample() {
  return (
    <div>
      <Image width={square} height={square} src={src} alt="ALT" layout="fixed"/>
    </div>
  );
}

const src = IMAGE.single.starcraft.src;
const square = 450;