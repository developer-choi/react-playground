'use client';

import React, {useCallback} from 'react';
import Script from 'next/script';
import useCounter from '@/utils/extend/library/counter';
import {useKakaoShare} from '@/utils/extend/library/kakao';

/**
 * URL : http://localhost:3000/experimental/kakao/share
 * Doc : https://docs.google.com/document/d/11c1oVMukpdpBcE0jeewfnlKklJ1YxJoBIxgM-qEdL0Q/edit
 */
export default function Page() {
  const {increase, count} = useCounter({initial: 1});
  const {scriptProps, shareProductToKakaoTalk} = useKakaoShare();

  const onClick = useCallback(() => {
    shareProductToKakaoTalk({
      title: `상품이름-${count}`,
      thumbnail: 'http://k.kakaocdn.net/dn/dScJiJ/btqB3cwK1Hi/pv5qHVwetz5RZfPZR3C5K1/kakaolink40_original.png',
      regularPrice: 2855105,
      discountRate: 18,
      discountPrice: 2360600,
      pk: count
    });
  }, [count, shareProductToKakaoTalk]);

  return (
    <div>
      <button onClick={onClick}>Kakao Talk Share</button>
      <button onClick={increase}>Increase (current: {count})</button>
      <Script {...scriptProps} />
    </div>
  );
};
