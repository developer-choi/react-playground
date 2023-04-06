import React from 'react';
import Image from 'next/image';
import {EXTERNAL_IMAGE_URL, WrapperChildBorder} from '@pages/study/next/image/layout/fill';

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

//http://localhost:3000/study/next/image/intrinsic-or-fixed
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
    <>
      <WrapperChildBorder>
        <Image width={400} height={400} src={EXTERNAL_IMAGE_URL} alt="ALT" layout="intrinsic"/>
      </WrapperChildBorder>

      <Image width={400} height={400} src={EXTERNAL_IMAGE_URL} alt="ALT" layout="intrinsic"/>
    </>
  );
}

function FixedExample() {
  return (
    <>
      <WrapperChildBorder>
        <Image width={400} height={400} src={EXTERNAL_IMAGE_URL} alt="ALT" layout="fixed"/>
      </WrapperChildBorder>

      <Image width={400} height={400} src={EXTERNAL_IMAGE_URL} alt="ALT" layout="fixed"/>
    </>
  );
}
