import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Button from '@component/atom/element/Button';
import Script from 'next/script';
import useCounter from '@util/custom-hooks/useCounter';
import type {ScriptProps} from 'next/dist/client/script';
import env from '@util/env';

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

export interface KakaoShareParam {
  shareButtonId: string; // #제외
  product: {
    title: string;
    thumbnail: string;
    regularPrice: number;
    discountRate: number;
    discountPrice: number;
    pk: number;
  };
}

export interface KakaoShareResult {
  scriptProps: ScriptProps;
  shareButtonId: string;
  initialized: boolean;
}

function useKakaoShare({shareButtonId, product}: KakaoShareParam): KakaoShareResult {
  const [initialized, setInitialized] = useState(false);

  const onLoad = useCallback(() => {
    if (!window.Kakao) {
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(env.public.kakaoJavascriptKey as string);
      setInitialized(true);
    }

    console.log('initialized', window.Kakao.isInitialized());
  }, []);

  //https://developers.kakao.com/tool/demo/message/kakaolink?default_template=commerce
  const scriptProps: ScriptProps = useMemo(() => ({
    src: 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js',
    integrity: 'sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx',
    crossOrigin: 'anonymous',
    onLoad
  }), [onLoad]);

  const {regularPrice, discountPrice, discountRate, thumbnail, pk, title} = product;

  useEffect(() => {
    if (!initialized || !window.Kakao) {
      return;
    }

    const resultUrl = env.public.origin + `/libraries/kakao/share-target?pk=${pk}`;

    window.Kakao.Share.createDefaultButton({
      container: `#${shareButtonId}`,
      objectType: 'commerce',
      content: {
        title: title,
        imageUrl: thumbnail,
        link: {
          webUrl: env.public.origin
        }
      },
      commerce: {
        regularPrice,
        discountRate,
        discountPrice
      },
      buttons: [
        {
          title: '구매하기',
          link: {
            webUrl: resultUrl,
            mobileWebUrl: resultUrl,
            androidExecutionParams: resultUrl,
            iosExecutionParams: resultUrl
          }
        }
      ]
    });
  }, [initialized, shareButtonId, regularPrice, discountPrice, discountRate, thumbnail, title, pk]);

  return {
    scriptProps,
    shareButtonId: shareButtonId,
    initialized
  };
}
