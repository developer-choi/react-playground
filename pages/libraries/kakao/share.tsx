import React from 'react';
import Button from '@component/atom/element/Button';
import Script from 'next/script';
import useCounter from '@util/services/counter';
import useKakaoShare from '@util/extend/kakao';

export default function Page() {
  const {increase, count} = useCounter({initial: 1});
  const {scriptProps, shareButtonId, initialized} = useKakaoShare({
    shareButtonId: 'kakaotalk-sharing-btn',
    product: {
      title: `상품이름-${count}`,
      thumbnail: 'http://k.kakaocdn.net/dn/dScJiJ/btqB3cwK1Hi/pv5qHVwetz5RZfPZR3C5K1/kakaolink40_original.png',
      regularPrice: 2855105,
      discountRate: 18,
      discountPrice: 2360600,
      pk: count
    }
  });

  return (
    <div>
      <Button id={shareButtonId} disabled={!initialized}>Kakao Talk Share</Button>
      <Button onClick={increase}>Increase (current: {count})</Button>
      <Script {...scriptProps} />
    </div>
  );
};
