import type {ScriptProps} from 'next/dist/client/script';
import {useCallback, useEffect, useMemo, useState} from 'react';
import env from '@util/env';
import type {KakaoCommerce} from '@type/declarations/kakao';

export interface KakaoShareParam {
  shareButtonId: string; // #제외
  product: {
    title: string;
    thumbnail: string;
    regularPrice: number;
    discountRate?: number;
    discountPrice?: number;
    pk: number;
  };
}

export interface KakaoShareResult {
  scriptProps: ScriptProps;
  shareButtonId: string;
  initialized: boolean;
}

export default function useKakaoShare({shareButtonId, product}: KakaoShareParam): KakaoShareResult {
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

    const resultUrl = env.public.origin + `/study/kakao/share-target?pk=${pk}`;

    window.Kakao.Share.createDefaultButton({
      container: `#${shareButtonId}`,
      objectType: 'commerce',
      content: {
        title: title,
        imageUrl: thumbnail,
        //카카오개발자센터에 등록한 도메인중에 하나여야함
        link: {
          webUrl: env.public.origin
        }
      },
      commerce: {regularPrice},
      buttons: [
        {
          title: '상품보러가기',
          link: {
            webUrl: resultUrl,
            mobileWebUrl: resultUrl,
            androidExecutionParams: resultUrl,
            iosExecutionParams: resultUrl
          }
        },
        {
          title: '쇼핑몰가기',
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

function commerce({regularPrice, discountPrice, discountRate}: Pick<KakaoShareParam['product'], 'regularPrice' | 'discountRate' | 'discountPrice'>): KakaoCommerce {
  if (discountPrice && discountRate) {
    return {
      regularPrice,
      discountPrice, 
      discountRate
    };
    
  } else {
    return {
      regularPrice
    };
  }
}
