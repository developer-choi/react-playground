import React from 'react';
import Image from 'next/image';

/**
 * 모든 layout은, crop이 기본적으로 안되고 지정한 width height 비율에 맞게 이미지가 찌부된다.
 */

// URL: http://localhost:3000/study/next/image/layout/ratio
export default function Page() {
  return (
    <>
      <Image src="/images/ratio-test.jpg" alt="비율 테스트" layout="fixed" width={100} height={100}/>
      <Image src="/images/ratio-test.jpg" alt="비율 테스트" layout="intrinsic" width={100} height={100}/>
      <div style={{position: 'relative', width: 100, height: 100}}>
        <Image src="/images/ratio-test.jpg" alt="비율 테스트" layout="fill"/>
      </div>
      <Image src="/images/ratio-test.jpg" alt="비율 테스트" layout="responsive" width={100} height={100}/>
    </>
  );
}
